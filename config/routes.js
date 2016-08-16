/*
 * Set up the application's routes.
 */

var express = require('express');

module.exports = function(app, io) {
    var hello = require('../api/hello');
    var events = require('../api/events.js')(io);
    app.get('/', hello.world);
    app.post('/api/events', events.create);
    app.get('/api/events')
    app.get('/api/events/:committee', events.find);
    app.get('/api/event/:id', events.findByID);
    app.post('/api/event/:id/attendee', events.addAttendee);
    app.post('/api/event/:id/swipe', events.addSwipe);
    app.post('/api/event/:id/update', events.update);
    // TODO: Add more
};
