/*
 * Set up the application's routes.
 */

var express = require('express');
var User = require('../models/User.js');

module.exports = function(app, io, passport) {
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

    // Auth routes:
    app.post('/register', function(req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account: account });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        });
    });
    app.post('/login', passport.authenticate('local',{
        successRedirect:'/'
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



};
