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

# Set up environment variables
echo "Creating .env file..."
mkdir -p /home/ubuntu/app
cat > /home/ubuntu/app/.env << EOF
DATABASE_URL=postgresql://${db_username}:${db_password}@${db_host}:5432/${db_name}
AWS_BUCKET=${s3_bucket}
AWS_REGION=eu-central-1
NODE_ENV=production
PORT=3000
EOF

# Clone the project (requires GitHub access)
# cd /home/ubuntu/app
# git clone https://github.com/YOUR_USERNAME/your-repo.git .

echo "Installation complete!"
echo "EC2 Instance Ready for deployment"
