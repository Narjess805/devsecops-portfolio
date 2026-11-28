resource "aws_s3_bucket" "mon_bucket" {
  bucket = "mon-bucket-terraform"
}

resource "aws_sqs_queue" "ma_file" {
  name = "ma-file-terraform"
}

resource "aws_dynamodb_table" "ma_table" {
  name         = "MaTableTerraform"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
}
