var Event = require('../models/Events.js').Event;

module.exports = {
  create: function(req, res, next) { 
    var newEvent = new Event(req.body);
    Event.save(function(err, event) {
      if (err) {
        res.json({e: err});
      } else {
        res.json(event);
      }
    });
  }
};
