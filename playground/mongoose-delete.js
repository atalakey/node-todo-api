const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

// Create todos
Todo.insertMany([
  { text: 'Something to do' },
  { text: 'Something to do' },
  { text: 'Something to do' }
]).then((docs) => {
  // Delete all documents that matches the criteria
  Todo.deleteMany({ text: 'Something to do' }).then((result) => {
    console.log('Todos removed', result);
  }).catch((err) => console.log(err));
}, (err) => {
  console.log('Unable to create todo');
});

// Create a todo
Todo.create({ text: 'Something else to do' }).then((doc) => {
  var id = doc._id;

  // Checks if the ID is a valid bson ObjectId
  if (!ObjectID.isValid(id)) {
    return console.log('ID not valid');
  }

  // Find document by ID then delete it
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return console.log('Todo not found');
    }

    console.log('Todo removed', todo);
  }).catch((err) => console.log(err));
}, (err) => {
  console.log('Unable to create todo');
});
