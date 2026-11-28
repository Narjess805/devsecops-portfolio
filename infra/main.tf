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
  attribute {
    name = "Id"
    type = "S"
  }
}
