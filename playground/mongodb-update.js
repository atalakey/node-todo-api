const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected successfully to MongoDB server');

  const db = client.db(dbName);

  // Update the first document that matches the criteria and return the updated object
  db.collection('Todos').findOneAndUpdate(
    // Search criteria
    { text: 'Something to do', completed: false },
    // Update operators
    {
      // Update field
      $set: { completed: true }
    },
    // Get updated object
    { returnOriginal: false }
  ).then((result) => {
    console.log('Update and get the first non completed todo');
    console.log(result);
  }, (err) => {
    console.log('Unable to update and get the first non completed todo', err);
  });

  // Update the first document that matches the criteria and return the updated object
  db.collection('Users').findOneAndUpdate(
    // Search criteria
    { name: 'John Doe' },
    // Update operators
    {
      // Update field
      $set: { location: 'Some other location' },
      // Increment field
      $inc: { age: 1 }
    },
    // Get updated object
    { returnOriginal: false }
  ).then((result) => {
    console.log('Update and get John Doe');
    console.log(result);
  }, (err) => {
    console.log('Unable to update and get the first non completed todo', err);
  });

  // client.close();
});
