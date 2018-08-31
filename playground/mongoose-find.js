const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

// Create a todo
Todo.create({ text: 'Something to do' }).then((doc) => {
  var id = doc._id;

  // Checks if the ID is a valid bson ObjectId
  if (!ObjectID.isValid(id)) {
    return console.log('ID not valid');
  }

  // Fetch all documents that matches the criteria
  Todo.find({ _id: id }).then((todos) => {
    if (todos.length === 0) {
      return console.log('No todos found');
    }

    console.log('Todos', todos);
  }).catch((err) => console.log(err));

  // Fetch the first document that matches the criteria
  Todo.findOne({ _id: id }).then((todo) => {
    if (!todo) {
      return console.log('Todo not found');
    }

    console.log('Todo', todo);
  }).catch((err) => console.log(err));

  // Fetch document by ID
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return console.log('Todo not found');
    }

    console.log('Todo By ID', todo);
  }).catch((err) => console.log(err));
}, (err) => {
  console.log('Unable to create todo');
});
