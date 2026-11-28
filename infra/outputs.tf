output "bucket_name" {
  description = "Nom du bucket S3 créé"
  value       = aws_s3_bucket.mon_bucket.bucket
}

output "queue_url" {
  description = "URL de la file SQS"
  value       = aws_sqs_queue.ma_file.url
}

output "table_name" {
  description = "Nom de la table DynamoDB"
  value       = aws_dynamodb_table.ma_table.name
}
