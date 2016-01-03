var Event = require('../models/Events.js');

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
 * @apiName AddAttendee
 * @apiGroup User
 *
 * @apiDescription Adds an attendee with the given characteristics to the attendance array of the event with the specified ID.
 *
 * @apiParam {String} netID NetID of Attendee.
 * @apiParam {Nuumber} class_year Class Year of Attendee.
 * @apiParam {String} school School of Attendee.
 * @apiParam {String} gender Gender of Attendee, either "M" or "F".
 * @apiParam {Date} time_swiped Time Attendee swiped in.
 * @apiParam {Number} time_since_start Minutes between start of event and Attendee's swipe.
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
  }
};
