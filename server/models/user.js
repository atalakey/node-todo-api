const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Instance method (this = the individual document)
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Instance method (this = the individual document)
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'somesecret').toString();

  user.tokens.push({ access, token });

  return user.save().then(() => token);
};

// Model method (this = the model)
UserSchema.statics.findByToken = function (token) {  
  const User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'somesecret');    
  } catch (error) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

/*
  Middleware (also called pre and post hooks) are functions which
  are passed control during execution of asynchronous functions.
  Mongoose has 4 types of middleware:
    1. Document middleware (this refers to the document).
    2. Model middleware (this refers to the query).
    3. Aggregate middleware (this refers to the aggregation object).
    4. Query middleware (this refers to the model).

  visit https://mongoosejs.com/docs/middleware.html for more info.
*/
// Create middleware to run some code before the 'save' event
UserSchema.pre('save', function (next) {
  const user = this;

  // Check if a specific field has been modified
  if (user.isModified('password')) {
    bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(user.password, salt);
    }).then((hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
