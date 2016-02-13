// Usage: 'node dataFiller.js numberOfEvents numberOfAttendees_lower numberOfAttendees_upper' 

var f = require('faker');
var request = require('request');

var nof = parseInt(process.argv[2]);
var noal = parseInt(process.argv[3]);
var noau = parseInt(process.argv[4]) 

for(var i = 0; i < nof; i++) {
	var start_time = f.date.past();
	var end_time = new Date(start_time.getTime());
	end_time.setUTCHours(end_time.getUTCHours() + 1 + Math.floor(Math.random() * 6));
	var attendance = [];
	for(var j = 0; j <  Math.random() * (noau - noal) + noal; j++) {
		var time_swiped = f.date.between(start_time, end_time);
		attendance.push({
			firstName: f.name.firstName(),
			lastName: f.name.lastName(),
			netid: f.internet.domainWord().substring(0,3)+f.random.number(), 
			gradYear: Math.floor(Math.random() * (5)) + 2015 + " " + f.helpers.randomize(["Sprng", "Fall"]),
			school: f.helpers.randomize(["A&SU", "pratt"]),
			timeSwiped: time_swiped,
			timeSinceStart: (time_swiped.getTime() - start_time.getTime()) / 60000 
		});
	}

	var newEvent = {
		committee: f.helpers.randomize(["Coffee House", "Speakers & Stages", "LDOC", "Visarts", "WXDU", "Small Town Records", "Jazz@", "Innovations", "Freewater Presentations", "Freewater Productions", "Duke Student Broadcasting", "Campus Concerts", "Annual Events"]),
		event_name:	f.company.bsAdjective() + " " + f.helpers.randomize(["Luncheon", "Meeting", "Soiree", "Focus Group", "Night", "Hour", "Show"]),
		loc: { 
			location_str: 	f.address.streetAddress(),
			location_desc:	f.address.streetName()
		},
		start_time: start_time,
		end_time: end_time,
		links: [f.internet.url(), f.internet.url(), f.internet.url(), f.internet.url()],
		event_desc:	f.lorem.paragraphs(),
		primary_duu_contacts: [{contact_name: f.name.findName(), contact_info: f.internet.email()}, {contact_name: f.name.findName(), contact_info: f.internet.email()}, {contact_name: f.name.findName(), contact_info: f.internet.email()}],
		primary_ext_contacts: [{contact_name: f.name.findName(), contact_info: f.internet.email()}, {contact_name: f.name.findName(), contact_info: f.internet.email()}],
		notes: f.hacker.phrase(),
		attendance: attendance,
		est_cost: f.commerce.price(),
		restricted_access: f.random.boolean(),
		is_public: f.random.boolean()
	}
	request({
		url:"http://localhost:8080/api/events",
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newEvent)
	},
	function(err, httpResp, body){
		console.log("-----" + body);
	});
}