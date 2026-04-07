variable "aws_region" {
  description = "AWS регіон"
  type        = string
  default     = "eu-central-1"
}

variable "environment" {
  description = "Назва середовища"
  type        = string
  default     = "lab7"
}

variable "app_name" {
  description = "Назва застосунку"
  type        = string
  default     = "lab7-app"
}

variable "instance_type" {
  description = "Тип EC2 інстансу"
  type        = string
  default     = "t2.micro"
}

variable "db_name" {
  description = "Назва БД"
  type        = string
  default     = "lab7db"
}

variable "db_username" {
  description = "Користувач БД"
  type        = string
  sensitive   = true
  default     = "postgres"
}

variable "db_password" {
  description = "Пароль БД"
  type        = string
  sensitive   = true
}

variable "s3_bucket_name" {
  description = "Назва S3 бакета для файлів"
  type        = string
}
