variable "aws_region" {
  description = "AWS регіон для розгортання"
  type        = string
  default     = "eu-central-1"
}

variable "bucket_name" {
  description = "Унікальне ім'я S3 бакета (наприклад: lab6-prizvyshche-unique)"
  type        = string
  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]*[a-z0-9]$", var.bucket_name))
    error_message = "Ім'я бакета повинно містити тільки малі літери, цифри та дефіси."
  }
}

variable "environment" {
  description = "Назва середовища"
  type        = string
  default     = "production"
}
