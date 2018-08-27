/*
  require using ES6 object destructuring which pulls out
  properties from an object creating variables.

  Ex.
  var user = { name: 'John', age: 25 };
  var { name } = user;
  console.log(name);
*/
const { MongoClient, ObjectID } = require('mongodb');

/*
  MongoDB object id is a 12 byte value added automatically by
  MongoDB if the _id property is not supplied. The object id
  is made of:
  1. Timestamp (4 bytes).
  2. Machine Identifier (3 bytes).
  3. Process ID (2 bytes).
  4. Counter (random value) (3 bytes).
*/
// generate object id manually
var objID = new ObjectID();
console.log('Manually generated MongoDB object ID:', objID);
