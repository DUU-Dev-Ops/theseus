/*
 * Set up the application's routes.
 */

var express = require('express');

module.exports = function(app) {
  var hello = require('../api/hello');
  app.get('/', hello.world);

  // TODO: Add more
};

