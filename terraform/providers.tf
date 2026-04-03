terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region

  # Credentials будуть завантажені з AWS CLI або змінних середовища
  # AWS_ACCESS_KEY_ID та AWS_SECRET_ACCESS_KEY
}
