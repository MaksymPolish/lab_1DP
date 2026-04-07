# ===================================================
# VPC та SECURITY GROUPS
# ===================================================

# Security Group для RDS (PostgreSQL)
resource "aws_security_group" "rds_sg" {
  name_prefix = "lab7-rds-"
  description = "Security Group для RDS"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.app_name}-rds-sg"
    Environment = var.environment
  }
}

# Security Group для EC2
resource "aws_security_group" "ec2_sg" {
  name_prefix = "lab7-ec2-"
  description = "Security Group для EC2 (Web Server)"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # ⚠️ РЕКОМЕНДУЄТЬСЯ ОБМЕЖИТИ НА ВАШУ IP
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.app_name}-ec2-sg"
    Environment = var.environment
  }
}

# ===================================================
# RDS DATABASE
# ===================================================

resource "aws_db_subnet_group" "lab7" {
  name_prefix = "lab7-"
  subnet_ids  = data.aws_subnets.default.ids

  tags = {
    Name        = "${var.app_name}-subnet-group"
    Environment = var.environment
  }
}

resource "aws_db_instance" "lab7" {
  identifier              = "${var.app_name}-db"
  engine                  = "postgres"
  engine_version          = "15.3"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  storage_type            = "gp2"
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  publicly_accessible     = false
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.lab7.name
  skip_final_snapshot     = true
  parameter_group_name    = "default.postgres15"

  tags = {
    Name        = "${var.app_name}-db"
    Environment = var.environment
  }
}

# ===================================================
# EC2 INSTANCE
# ===================================================

# Отримати найновіший Ubuntu 22.04 AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Data source для отримання default VPC subnets
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_instance" "lab7_web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  iam_instance_profile   = aws_iam_instance_profile.lab7_ec2.name
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  key_name               = aws_key_pair.lab7.key_name
  
  # User data - встановлення Node.js та Nginx при запуску
  user_data = base64encode(<<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              sudo apt update
              sudo apt upgrade -y
              
              # Install Node.js 20
              curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
              sudo apt install -y nodejs
              
              # Install Git
              sudo apt install -y git
              
              # Install Nginx
              sudo apt install -y nginx
              
              # Install PM2 globally
              sudo npm install -g pm2
              
              # Create app directory
              mkdir -p /home/ubuntu/app
              
              echo "Installation complete!"
              EOF
  )

  tags = {
    Name        = "${var.app_name}-ec2"
    Environment = var.environment
  }

  depends_on = [aws_security_group.ec2_sg]
}

# SSH Key Pair
resource "aws_key_pair" "lab7" {
  key_name_prefix = "lab7-"
  public_key      = file("${path.module}/lab7_key.pub")

  tags = {
    Name        = "${var.app_name}-key"
    Environment = var.environment
  }
}

# ===================================================
# S3 BUCKET FOR MEDIA FILES
# ===================================================

resource "aws_s3_bucket" "lab7" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = "${var.app_name}-files"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "lab7" {
  bucket = aws_s3_bucket.lab7.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "lab7" {
  bucket = aws_s3_bucket.lab7.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "lab7" {
  bucket = aws_s3_bucket.lab7.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "PublicReadGetObject"
        Effect = "Allow"
        Principal = {
          AWS = "*"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.lab7.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.lab7]
}

# ===================================================
# IAM ROLE FOR EC2
# ===================================================

resource "aws_iam_role" "lab7_ec2_role" {
  name_prefix = "lab7-ec2-role-"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.app_name}-ec2-role"
    Environment = var.environment
  }
}

resource "aws_iam_role_policy" "lab7_s3_access" {
  name_prefix = "lab7-s3-policy-"
  role        = aws_iam_role.lab7_ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.lab7.arn}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.lab7.arn
      }
    ]
  })
}

resource "aws_iam_instance_profile" "lab7_ec2" {
  name_prefix = "lab7-ec2-profile-"
  role        = aws_iam_role.lab7_ec2_role.name
}

# ===================================================
# OUTPUTS
# ===================================================

output "ec2_public_ip" {
  description = "Public IP адреса EC2 інстансу"
  value       = aws_instance.lab7_web.public_ip
}

output "ec2_instance_id" {
  description = "ID EC2 інстансу"
  value       = aws_instance.lab7_web.id
}

output "rds_endpoint" {
  description = "RDS endpoint для підключення"
  value       = aws_db_instance.lab7.endpoint
  sensitive   = true
}

output "s3_bucket_name" {
  description = "S3 bucket назва"
  value       = aws_s3_bucket.lab7.id
}

output "ssh_command" {
  description = "SSH команда для підключення"
  value       = "ssh -i lab7_key.pem ubuntu@${aws_instance.lab7_web.public_ip}"
}
