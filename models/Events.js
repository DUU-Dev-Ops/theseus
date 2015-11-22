/*
 * Mongoose schema for DUU Events 
 */ 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  committee: {
	type: String,
     	required: true,
     	lowercase: true,
     	trim: true,
     	index: { unique: true }
  },
  location: { 
	location_str: 	{	type: String},
	location_desc:	{	type: String, 
				required: true
			}    
  },
  start_time:		{type: String, required: true},
  end_time:		{type: String, required: true}, 
  links:		{type: Array},
  event_desc:		{type: String, required: true},
  primary_duu_contacts:	{type: Array, required: true},
  primary_ext_contacts:	{type: Array, required: true},
  notes: 		{type: String},
  attendance:		{type: Array, default:[]},
  attendance_sensor:	{type: Array, default: []},
  sensor_count:		{type: Number, default:0},
  est_cost:		{type: Number, default:0},
  restricted_access:	{type: Boolean, required: true},
  isPublic:		{type: Boolean, required: true} 
});

module.exports = mongoose.model('Event', EventSchema);

