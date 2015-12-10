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
  },
  find: function(req,res) {
    var currentcommittee = req.params.committee;
    Event.find({ committee: currentcommittee }, function(err, events) {
      if (err) {
	res.json({error: err});
      }
      res.json(events);
  });
  },
  findByID: function(req,res) {
    var currentID = req.params.id;
    Event.findOne({ _id: currentID }, function(err, IDs) {
      if (err) {
	res.json({error: err});
      }
      res.json(IDs);
  });
  }

};
