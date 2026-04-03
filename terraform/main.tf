# ===================================================
# AWS S3 BUCKET FOR STATIC WEBSITE HOSTING
# ===================================================

# Створення S3 бакета
resource "aws_s3_bucket" "website" {
  bucket = var.bucket_name

  tags = {
    Name        = "Lab6-Website"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# ===================================================
# S3 BUCKET VERSIONING
# ===================================================
resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ===================================================
# S3 BUCKET WEBSITE CONFIGURATION
# ===================================================
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  depends_on = [aws_s3_bucket_public_access_block.website]
}

# ===================================================
# BLOCK PUBLIC ACCESS SETTINGS
# ===================================================
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# ===================================================
# S3 BUCKET POLICY - Дозволити публічний читання
# ===================================================
resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "PublicReadGetObject"
        Effect = "Allow"
        Principal = {
          "AWS" = "*"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.website]
}

# ===================================================
# OUTPUTS - Вихідні дані для подальшого використання
# ===================================================
output "bucket_name" {
  description = "Назва S3 бакета"
  value       = aws_s3_bucket.website.id
}

output "bucket_region" {
  description = "Регіон S3 бакета"
  value       = aws_s3_bucket.website.region
}

output "website_endpoint" {
  description = "Статична веб-сторінка URL"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "bucket_arn" {
  description = "ARN бакета"
  value       = aws_s3_bucket.website.arn
}
