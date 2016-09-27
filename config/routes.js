/*
 * Set up the application's routes.
 */

var express = require('express');
var User = require('../models/User.js');
var keys = require('../env_vars.js');

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
        if (req.body.token !== keys.newAccountToken) {
            res.status(403).json({});
            return;
        }

        User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                console.log(account);
                return res.status(401).json({ account: account });
            }
            passport.authenticate('local')(req, res, function() {
                res.status(200).json(req.user);
            });
        });
    });
    app.post('/login', function(req, res) {
        passport.authenticate('local')(req, res, function() {
            res.status(200).json(req.user)
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/me', function(req, res) {
        if (req.user) {
            res.status(200).json({ user: req.user });
        } else {
            res.status(403).json({});
        }
    })



};
