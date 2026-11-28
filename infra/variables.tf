variable "bucket_name" {
  description = "Nom du bucket S3"
  type        = string
  default     = "mon-bucket-terraform"
}

variable "queue_name" {
  description = "Nom de la file SQS"
  type        = string
  default     = "ma-file-terraform"
}

variable "table_name" {
  description = "Nom de la table DynamoDB"
  type        = string
  default     = "MaTableTerraform"
}
