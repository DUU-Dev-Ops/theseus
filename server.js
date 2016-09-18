/*
 * Entry of the web application
 */

// Set up Express.js
var express = require('express');
var app = express();
var http = require('http').Server(app);
var envVars = require('./env_vars.js')

// Load libraries
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var io = require('socket.io')(http);

// Set up logging
app.use(morgan('dev'));

// Set up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static content
app.use(express.static(__dirname + '/node_modules')); // client-side frameworks
app.use(express.static(__dirname + '/public')); // HTML, CSS

// Set up favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// passport-local-auth
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(methodOverride());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: envVars.secret
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/User.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to Mongodb
require('./config/db')()

// Set up app routes
require('./config/routes')(app, io, passport);

// TODO: Set up CSURF, maybe?

// Default error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    switch (err.name) {
        case "ValidationError":
        case "CastError":
            err.status = 400;
            break;
            // Add further specific errors here
    }
    res.status(err.status || 500).send({ error: err });
});

exports = module.exports = app;
if (!module.parent) {
    var port = process.env.PORT || 8080; // 8080 as default

    io.on('connection', function(socket) {
        socket.on('room', function(room) {
            socket.join(room);
        });
    })

    // On Linux make sure you have root to open port 80
    http.listen(port, function() {
        console.log('Listening on port ' + port);
    });
}
