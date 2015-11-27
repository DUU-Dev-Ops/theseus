/*
 * Set up the application's routes.
 */

var express = require('express');

module.exports = function(app) {
  var hello = require('../api/hello');
  var events = require('../api/events.js');
  app.get('/', hello.world);
  app.post('/api/events', events.create);
  
  // TODO: Add more
};

