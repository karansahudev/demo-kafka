const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
  const username = encodeURIComponent('your-username'); // Replace with your username
  const password = encodeURIComponent('your-password'); // Replace with your password
  const clusterEndpoint = 'your-documentdb-endpoint:27017'; // Replace with your DocumentDB cluster endpoint

  const uri = `mongodb://${username}:${password}@${clusterEndpoint}/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

  const sslCA = [fs.readFileSync('rds-combined-ca-bundle.pem')];

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: true,
    sslCA: sslCA,
  });

  try {
    // Connect to the DocumentDB cluster
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
