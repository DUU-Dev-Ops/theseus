/*
 * database.js
 * Set up the database connection information and connect to the database.
 */

var mongoose = require('mongoose');

var config = {
  url: process.env.MONGO_URI || 'mongodb://localhost/deploy'
}; // The default port of MongoDB is 27017

module.exports = function() {
  mongoose.connect(config.url);
};

