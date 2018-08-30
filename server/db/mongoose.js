const mongoose = require('mongoose');

// Configure mongoose to use promises instead of callbacks
mongoose.Promise = global.Promise;

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Connect to the server
mongoose.connect(uri, {
  dbName: dbName,
  useNewUrlParser: true
});

module.exports = { mongoose };
