request = require('request');

data = [
    { netid: "Aie4", school: "Pratt grad" },

    { netid: "Mm553", school: "Pratt grad" },

    { netid: "Gc120", school: "Pratt grad" },

    { netid: "Arg33", school: "Pratt grad" },

    { netid: "Jad97", school: "freshman" },

    { netid: "So105", school: "freshman" },

    { netid: "Acd42", school: "freshman" },

    { netid: "Jlm158", school: "freshman" },

    { netid: "Kah41", school: "freshman" },

    { netid: "Cpj10", school: "freshman" },

    { netid: "Cis10", school: "freshman" },

    { netid: "Tk130", school: "Pratt grad" },

    { netid: "An120", school: "Pratt grad" },

    { netid: "Ss567", school: "physics grad" },

    { netid: "Hak67", school: "freshman" },

    { netid: "Mpm47", school: "freshman" },

    { netid: "Trw34", school: "freshman" },

    { netid: "Mw350", school: "freshman" },

    { netid: "Ajh98", school: "freshman" },

    { netid: "Edm24", school: "senior" },

    { netid: "Adm43", school: "senior" },

    { netid: "Atm24", school: "senior" },

    { netid: "Ad239", school: "senior" },

    { netid: "Blc18", school: "Nicholas grad" },

    { netid: "Jrl56", school: "Nicholas grad" },

    { netid: "Jdf46", school: "Nicholas grad" },

    { netid: "Mlw67", school: "Nichols grad" },

    { netid: "Das95", school: "Nicholas grad" },

    { netid: "Pea7", school: "Nicholas grad" },

    { netid: "Asb72", school: "Nicholas grad" },

    { netid: "Alh91", school: "Nichols grad" },

    { netid: "Sam98", school: "senior" },

    { netid: "Cjg29", school: "senior" },

    { netid: "Tjr15", school: "senior" },

    { netid: "Gw161", school: "senior" },

    { netid: "Klp33", school: "senior" },

    { netid: "Jrs87", school: "senior" },

    { netid: "Jmc95", school: "senior" },

    { netid: "Eee12", school: "senior" },

    { netid: "Jdg33", school: "senior" },

    { netid: "Bwh21", school: "senior" },

    { netid: "Mds61", school: "senior" },

    { netid: "Lrh27", school: "senior" },

    { netid: "Mju2", school: "senior" },

    { netid: "Ey30", school: "senior" },

    { netid: "Cmj28", school: "senior" },

    { netid: "Cs349", school: "senior" },

    { netid: "Rrw13", school: "senior" },

    { netid: "Ncb28", school: "staff" },

    { netid: "Ak370", school: "Econ grad" },

    { netid: "Rjr28", school: "Nicholas grad" }
]

data.forEach(function(d) {
    request.post({
        url: "http://localhost:8080/api/event/58014dc5f93a88280631ab31/attendee",
        form: d
    }, function(err, resp, body) {
        console.log(body);
        if (err) {
            console.log(err)
        }
    });
})
