const { MongoClient } = require('mongodb');

// Replace the connection string with your MongoDB Atlas connection string
const uri = 'mongodb+srv://Team18:Team18pwd@node-rest-canvas.lystdp9.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteAllDocuments() {
  try {
    await client.connect();

    // Specify your database and collection cnames
    const databaseName = 'test';
    const collectionName = 'nodes';

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Delete all documents in the collection
    const result = await collection.deleteMany({});


    console.log(`Deleted ${result.deletedCount} documents from the collection.`);
  } finally {
    await client.close();
  }
}

deleteAllDocuments();