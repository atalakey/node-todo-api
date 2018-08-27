const MongoClient = require('mongodb').MongoClient;

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

  /*
    Inserts a single document into MongoDB. If document passed in
    do not contain the _id field, one will be added by the driver
  */
  db.collection('Users').insertOne({
    // _id field added automatically by MongoDB
    name: 'John Doe',
    age: 20,
    location: 'Some location'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log('User John Due has been created successfully');
    console.log(JSON.stringify(result.ops, undefined, 2));
    // pull timestamp from the auto generated object ID
    console.log('Object ID Timestamp:', result.ops[0]._id.getTimestamp());
  });

  /*
    Inserts an array of documents into MongoDB. If documents passed in
    do not contain the _id field, one will be added to each of the
    documents missing it by the driver
  */
  db.collection('Todos').insertMany([
    { text: 'Something to do', completed: false },
    { _id: 1, text: 'Something to do', completed: false },
    { _id: 2, text: 'Something to do', completed: true },
    { _id: 3, text: 'Something to do', completed: false },
    { _id: 4, text: 'Something to do', completed: true },
    { _id: 5, text: 'Something to do', completed: false }
  ]
  , (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }

    console.log('Todos have been created successfully');
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // client.close();
});
