/*
 * Set up the application's routes.
 */

var express = require('express');
var User = require('../models/User.js');
var keys = require('../env_vars.js');

module.exports = function(app, io, passport) {
    var hello = require('../api/hello');
    var events = require('../api/events.js')(io);
    var auth = require('../api/auth.js')(passport);
    app.get('/', hello.world);
    app.get('/emails', hello.email);
    app.post('/api/events', events.create);
    app.get('/api/events')
    app.get('/api/events/:committee', events.find);
    app.get('/api/event/:id', events.findByID);
    app.post('/api/event/:id/attendee', events.addAttendee);
    app.post('/api/event/:id/swipe', events.addSwipe);
    app.post('/api/event/:id/update', events.update);
    app.post('/register', auth.register);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.get('/me', auth.getCurrentUser);
};
