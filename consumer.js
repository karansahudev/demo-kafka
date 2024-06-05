const { Kafka } = require('kafkajs');

// Replace with your MSK bootstrap servers
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092', 'localhost:9091']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Connecting the consumer
  await consumer.connect();
  console.log('Consumer connected');

  // Subscribing to the topic
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  // Consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition: partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));
