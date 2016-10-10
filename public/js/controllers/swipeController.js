var swipeController = angular.module('swipeController', ['focus-if']);
swipeController.controller('swipeController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.eventID = $routeParams.eventID;
    $('#manualForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/event/" + $routeParams.eventID + "/attendee",
            data: {
                netid: $("input[name=netId]").val(),
                firstName: $("input[name=firstName]").val(),
                lastName: $("input[name=lastName]").val(),
                gradYear: $("input[name=gradYear]").val(),
                school: $("input[name=school]").val(),
            },
            dataType: "json",
            success: function(data) {
                $("#swipeResults").prepend("<span style='color: green'>" + data.firstName + " " + data.lastName + "</span> swiped in. <br />");
            },
            error: function(err) {
                console.log(err.responseText);
                $("#swipeResults").prepend("<span style='color: red'>" + JSON.parse(err.responseText).error.message + "</span> <br />");
            },
            complete: function() {
                $("input[name=netId]").val("");
                $("input[name=firstName]").val("");
                $("input[name=lastName]").val("");
                $("input[name=gradYear]").val("");
                $("input[name=school]").val("");
            }
        });
        $(".swipe-input[name=num]").focus();
    });
    $('#swipeForm').submit(function(e) {
        var cardNum = $("[name=num]").val();
        if (cardNum.charAt(cardNum.length - 1) === '?') {
            cardNum = cardNum.substring(cardNum.length - 11, cardNum.length - 1);
        }
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/event/" + $routeParams.eventID + "/swipe",
            data: { num: cardNum },
            dataType: "json",
            success: function(data) {
                $("#swipeResults").prepend("<span style='color: green'>" + data.firstName + " " + data.lastName + "</span> swiped in. <br />");
            },
            error: function(err) {
                console.log(err.responseText);
                $("#swipeResults").prepend("<span style='color: red'>" + JSON.parse(err.responseText).error.message + "</span> <br />");
            },
            complete: function() {
                $("input[name=num]").val("");
            }
        });
        $(".swipe-input[name=num]").focus();
    });
    $(".swipe-input[name=num]").focus();
}]);
