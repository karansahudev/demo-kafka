from confluent_kafka import Consumer, KafkaError

# Kafka consumer configuration
consumer_conf = {
    'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka broker(s)
    'group.id': 'my_group',  # Consumer group id
    'auto.offset.reset': 'earliest'  # Start reading from the earliest message
}

# Create a Consumer instance
consumer = Consumer(consumer_conf)

# Subscribe to the Kafka topic
topic = 'my_topic'  # Replace with your Kafka topic
consumer.subscribe([topic])

# Open a file to write messages
output_file = 'kafka_messages.txt'

try:
    with open(output_file, 'w') as f:
        while True:
            # Poll for a message
            msg = consumer.poll(timeout=1.0)

            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    # End of partition event
                    print(f"End of partition reached {msg.partition()}")
                elif msg.error():
                    # Error
                    print(f"Error occurred: {msg.error().str()}")
                    break
            else:
                # Write the message to the file
                message = msg.value().decode('utf-8')
                f.write(message + '\n')
                print(f"Message received: {message}")

except KeyboardInterrupt:
    pass
finally:
    # Close the consumer when done
    consumer.close()
    print(f"Messages have been written to {output_file}")
