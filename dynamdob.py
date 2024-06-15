import boto3

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Reference your table
table = dynamodb.Table('YourTableName')

# Define your partition key (ID) and sort key values
partition_key_value = 'c123451234'
sort_key_value1 = 'P:Model_Name'
sort_key_value2 = 'P:Model_Name1'

# Create two items with the same partition key but different sort keys
item1 = {
    'ID': partition_key_value,
    'SortKey': sort_key_value1,
    'OtherAttribute': 'P:Model_name_2'
}

item2 = {
    'ID': partition_key_value,
    'SortKey': sort_key_value2,
    'OtherAttribute': 'Value2'
}

# Put the items into the DynamoDB table
table.put_item(Item=item1)
table.put_item(Item=item2)
