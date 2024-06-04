const { Kafka, logLevel } = require('kafkajs');

// Replace with your MSK bootstrap servers
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092', 'localhost:9093'],
  logLevel: logLevel.ERROR,  // Adjust log level as needed
    retry: {
      retries: 5,  // Number of retries for retriable errors
      initialRetryTime: 300,  // Initial retry time in ms
      maxRetryTime: 30000,  // Max retry time in ms
    }
});

const producer = kafka.producer();

const run = async () => {
  // Connecting the producer
  await producer.connect();
  console.log('Producer connected');

  // Sending a message
  await producer.send({
    topic: 'my-topic',
    messages: [
      { value: 'Hello Kafka from KafkaJS!' },
    ],
  });

  console.log('Message sent successfully');
  // Disconnecting the producer
  await producer.disconnect();
};

run().catch(e => console.error(`[example/producer] ${e.message}`, e));
