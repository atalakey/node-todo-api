const mongoose = require('mongoose');

// Configure mongoose to use promises instead of callbacks
mongoose.Promise = global.Promise;

// Connection URI
const uri = process.env.MONGODB_URI;

// Connect to the server
mongoose.connect(uri, {
  useNewUrlParser: true
});

module.exports = { mongoose };
