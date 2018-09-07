const bcrypt = require('bcryptjs');

const password = '123abc!';

// Asynchronously generate a salt
bcrypt.genSalt(10).then((salt) => {
  console.log('Password:', password);
  // Asynchronously generate a hash for the given password
  return bcrypt.hash(password, salt);
}).then((hash) => {
  console.log('Hashed Password:', hash);
  // Asynchronously compare the given password against the given hash
  return bcrypt.compare(password, hash);
}).then((result) => {
  console.log('Result:', result);
}).catch((err) => {
  console.log(err);
});
