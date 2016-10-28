var request = require('request');
var keys = require('../env_vars.js');

data = [];

newData = [];

function lookup(index) {
    if (index === data.length) {
        console.log(JSON.stringify(newData));
        return;
    }
    point = data[index];
    cardNum = point["netid"];
    if (cardNum.charAt(cardNum.length - 1) === '?') {
        cardNum = cardNum.substring(cardNum.length - 11, cardNum.length - 1);
    }
    if (cardNum === "") {
        newData.push(point);
        setTimeout(function() { lookup(index + 1); }, 1000);
    } else {
        request({
                url: "https://api.colab.duke.edu/identity/v1/swipe?num=" + cardNum,
                method: 'GET',
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': keys.identityKey
                }
            },
            function(err, httpResp, body) {
                if (err) {
                    console.log(err);
                    newData.push(point);
                    setTimeout(function() { lookup(index + 1); }, 1000);
                    return false
                };
                body = JSON.parse(body);
                if (body["netid"] === null || body["netid"] === undefined) {
                    point.firstName = "Student Not Found";
                    point.lastName = "";
                    newData.push(point);
                    setTimeout(function() { lookup(index + 1); }, 1000);
                    return false;
                };
                point.netid = body.netid;
                point.firstName = body.firstName;
                point.lastName = body.lastName;
                point.gradYear = body.gradYear;
                point.school = body.school;
                newData.push(point);
                setTimeout(function() { lookup(index + 1); }, 1000);
            });
    }
}

lookup(0);
