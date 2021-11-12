#!/bin/bash

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket artwork --region ap-southeast-2
aws --endpoint-url=http://localhost:4566 dynamodb create-table --table-name artwork --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --region ap-southeast-2
# aws --endpoint-url=http://localhost:4566 dynamodb create-table --table-name artwork --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5;
# aws --endpoint-url=http://localhost:4566 s3api list-objects-v2 --bucket artwork --region ap-southeast-2
# aws --endpoint-url=http://localhost:4566 dynamodb create-table --table-name foobar --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --region ap-southeast-2