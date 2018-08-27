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

  // Delete the first document that matches the criteria
  db.collection('Todos').deleteOne({ completed: false }).then((result) => {
    console.log('Delete the first non completed todo');
    console.log(result.result);
  }, (err) => {
    console.log('Unable to delete the first non completed todo', err);
  });

  // Delete all documents that matches the criteria
  db.collection('Todos').deleteMany({ completed: true }).then((result) => {
    console.log('Delete completed todos');
    console.log(result.result);
  }, (err) => {
    console.log('Unable to delete completed todos', err);
  });

  // Get the first document that matches the criteria then delete it 
  db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    console.log('Get then delete the first non completed todo');
    console.log(result);
  }, (err) => {
    console.log('Unable to get then delete the first non completed todo', err);
  });

  // client.close();
});
