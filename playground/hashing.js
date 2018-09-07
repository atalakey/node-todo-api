/*
  A cryptographic hash is a kind of ‘signature’ for a text or a
  data file. SHA-256 generates an almost-unique 256-bit (32-byte)
  signature for a text. A hash is not ‘encryption’ – it cannot be
  decrypted back to the original text. It is a ‘one-way’ cryptographic
  function, and is a fixed size for any size of source text.

  In cryptography, a salt is random data that is used as an additional
  input to a one-way function that "hashes" data. The primary function
  of salts is to defend against dictionary attacks or against its hashed
  equivalent, a pre-computed rainbow table attack.
*/
const { SHA256 } = require('crypto-js');

// SHA256 is a basic hash function that returns a 256-bit hash object
const message = 'This is a test data';
const hash = SHA256(message).toString();
console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

const data = { id: 4 };
const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

// Man-in-the-middle does not have access to the salt
token.data.id = 5;
token.data.hash = SHA256(JSON.stringify(data)).toString();

const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
