/*
 * Entry of the web application
 */

// Set up Express.js
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Load libraries
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
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

// Connect to Mongodb
require('./config/db')();

// TODO: Configure and load passport.js

// Set up app routes
require('./config/routes')(app, io);

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
