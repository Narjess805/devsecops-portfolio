resource "aws_s3_bucket" "mon_bucket" {
  bucket = var.bucket_name
}

resource "aws_sqs_queue" "ma_file" {
  name = var.queue_name
}

resource "aws_dynamodb_table" "ma_table" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Id"

  server_side_encryption {
    enabled     = true
    kms_key_arn = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }
  attribute {
    name = "Id"
    type = "S"
  }
}

resource "aws_kms_key" "dynamodb" {
  description         = "Clé KMS pour la table DynamoDB"
  enable_key_rotation = true
}
