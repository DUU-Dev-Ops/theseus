/*
 * database.js
 * Set up the database connection information and connect to the database.
 */

var mongoose = require('mongoose');
var envVars = require('../env_vars.js');

var config = {
    url: envVars.mongoURL || 'mongodb://localhost/deploy'
}; // The default port of MongoDB is 27017

module.exports = function() {
    mongoose.connect(config.url);
};
