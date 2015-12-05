/*
 * Set up the application's routes.
 */

var express = require('express');

module.exports = function(app) {
  var hello = require('../api/hello');
  var events = require('../api/events.js');
  app.get('/', hello.world);
  app.post('/api/events', events.create);
  app.get('/api/events/:committee', events.find);  
  app.get('/api/events/:id', events.findByID);
  // TODO: Add more

};

