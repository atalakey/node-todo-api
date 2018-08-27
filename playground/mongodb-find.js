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

  // Fetch all documents
  db.collection('Todos').find().toArray().then((docs) => {
    console.log('All todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Fetch all documents that matches the criteria
  db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
    console.log('Todos not completed');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch non completed todos', err);
  });

  // Fetch document by Object ID
  db.collection('Todos').find().toArray().then((docs) => {
    var todoID = docs[0]._id;
    db.collection('Todos').find({
      _id: new ObjectID(todoID)
    }).toArray().then((docs) => {
      console.log(`Todo with ID ${todoID}`);
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log(`Unable to fetch todo with ID ${todoID}`, err);
    });
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Count number of matching documents in the db
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count ${count}`);
  }, (err) => {
    console.log('Unable to count number of todos documents', err);
  });

  // client.close();
});
