var Event = require('../models/Events.js');

module.exports = {
  create: function(req, res, next) { 
    var newEvent = new Event(req.body);
    newEvent.save(function(err, event) {
      if (err) {
        res.json({error: err});
      } else {
        res.json(event);
      }
    });
  }
};
