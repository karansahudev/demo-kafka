const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB server URI

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection
    const database = client.db('sampledb');
    const collection = database.collection('users');

    // Create a document
    const newUser = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      interests: ['reading', 'traveling', 'coding'],
      createdAt: new Date()
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newUser);
    console.log(`New document created with _id: ${result.insertedId}`);

    // Query the document
    const query = { name: 'John Doe' };
    const user = await collection.findOne(query);
    console.log('Found document:', user);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
