/*
 * Mongoose schema for user accounts
 */

// TODO: Link to passport-local-mongoose
// See : https://github.com/saintedlama/passport-local-mongoose/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  unique_id: {
    type: String
    , required: true
    , lowercase: true // 'ABC' is equivalent 'abc'
    , trim: true // ' abc ' will be trimmed to 'abc'
    , index: { unique: true }
  },
  firstname: { // legal first name of user
    type: String
    , lowercase: false
    , trim: true
  },
  lastname: { // legal last name of user
    type: String
    , lowercase: false
    , trim: true
  },
  password: {
    type: String
  },
  email: {
    type: String
    , lowercase: true
    , trim: true
    , index: { unique: true }
  },
  date_created: { // when the user created his account
    type: Date
    , required: true
    , default: Date.now
  },
  auth : {
    type: String
    , required: true
    , default: "user"
  },
});

module.exports = mongoose.model('User', UserSchema);

