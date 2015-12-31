/*
 * Mongoose schema for DUU Events 
 */ 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
  committee: {
		type: String,
     	required: true, 
     	trim: true, 
  },
  event_name:			 {type: String, required: true, trim: true},
  loc: { 
	location_str: 		{type: String, default: ""},
	location_desc:		{type: String, required: true, default: ""}    
  },
  start_time:			{type: String, required: true, default:"TIME"},
  end_time:				{type: String, required: true, default: "TIME"}, 
  links:				{type: [String], default: []},
  event_desc:			{type: String, required: true},
  primary_duu_contacts:	{type: [{contact_name: String, contact_info: String}], required: true, default: []},
  primary_ext_contacts:	{type: [{contact_name: String, contact_info: String}], required: true, default:[]},
  notes: 				{type: String, default: ""},
  attendance:			{type: [Number], default:[]},
  attendance_sensor:	{type: [{swipe_id: String, swipe_time: String}], default: []},
  sensor_count:			{type: Number, default:0},
  est_cost:				{type: Number, default:0},
  restricted_access:	{type: Boolean, required: true, default: true},
  is_public:			{type: Boolean, required: true, default: false} 
});
module.exports = mongoose.model('Event', EventSchema);
