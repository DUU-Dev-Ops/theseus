var Event = require('../models/Events.js');
var request = require('request');

// var sslRootCAs = require('ssl-root-cas/latest')
// sslRootCAs.inject()

module.exports = {
  create: function(req, res, next) { 
    var newEvent = new Event(req.body);
    newEvent.save(function(err, event) {
      if (err) {
        return next(err);
      } else {
        res.json(event);
      }
    });
  },
  find: function(req,res,next) {
    var currentcommittee = req.params.committee;
    Event.find({ committee: currentcommittee }, function(err, events) {
      if (err) {
        return next(err);
      }
      res.json(events);
    });
  },
  findByID: function(req,res,next) {
    var currentID = req.params.id;
    Event.findOne({ _id: currentID }, function(err, IDs) {
      if (err) {
        return next(err);
      }
      res.json(IDs);
    });
  },

/**
* @api {post} /api/event/:id/attendee Add an attendee to an event
* @apiName addAttendee
* @apiGroup User
*
* @apiDescription Adds an attendee with the given characteristics to the attendance array of the event with the specified ID.
* 
* @apiParam {String} firstName first name of Attendee
* @apiParam {String} lastName last name of Attendee
* @apiParam {String} netid NetID of Attendee.
* @apiParam {Nuumber} gradYear Class Year of Attendee.
* @apiParam {String} school School of Attendee.
* @apiParam {Date} timeSwiped Time Attendee swiped in.
* @apiParam {Number} timeSinceStart Minutes between start of event and Attendee's swipe.
*
* @apiSuccess {Event} event The modified Event object
*
*/

  addAttendee: function(req, res, next) {
    Event.findOne({ _id: req.params.id }, function(err, ev) {
      if (err) return next(err);
      ev.attendance.push(req.body);
      ev.save(function(err) {
        if(err) return next(err);
        res.send(ev);
      });
    });
  },

/**
* @api {post} /api/event/:id/attendee Add an attendee to an event
* @apiName addSwipe
* @apiGroup User
*
* @apiDescription Adds an attendee found by looking up the provided DukeCard number to the attendance array of the event with the specified ID.
*
* @apiParam {String} num DukeCard number of Attendee
*
* @apiSuccess {Object} attendee The newly added Attendee
*
*/

  addSwipe: function(req, res, next) {
    Event.findOne({ _id: req.params.id }, function(err, ev) {
      if (err) return next(err);
      request({
        url:"https://api.colab.duke.edu/identity/v1/swipe?num=" + req.body.num,
        method: 'GET',
        rejectUnauthorized: false,          //Poor security practice, fix?
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'testapi'
        }
      },
      function(err, httpResp, body){
        if(err) return next(err);
        body = JSON.parse(body);
        if(body["netid"] === null || body["netid"] === undefined) return next({message: "Student not found."});
        var newAttendee = {
          timeSwiped: Date.now(),
          timeSinceStart: ((new Date()).getTime() - new Date(ev.start_time).getTime()) / 60000,
          netid: body.netid,
          firstName: body.firstName,
          lastName: body.lastName,
          gradYear: body.gradYear,
          school: body.school
        }
        console.log(newAttendee);
        ev.attendance.push(newAttendee);
        ev.save(function(err) {
          if(err) return next(err);
          res.send(body);
        });
      });
    });
  }
};
