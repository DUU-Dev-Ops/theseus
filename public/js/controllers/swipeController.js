var swipeController = angular.module('swipeController',[]);
swipeController.controller('swipeController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	$scope.eventID = $routeParams.eventID;
	$('#swipeForm').submit(function(e) {
		var cardNum = $("[name=num]").val();
		if(cardNum.charAt(0) === ';') {
			cardNum = cardNum.substring(6,cardNum.length - 1);
		}
		e.preventDefault();
		console.log("hi");
		$.ajax({
			type: "POST",
			url: "/api/event/" + $routeParams.eventID + "/swipe",
			data: {num: cardNum},
			dataType: "json",
			success: function(data) {
				$("#swipeResults").prepend("<span style='color: green'>" + data.firstName + " " + data.lastName + "</span> swiped in. <br />");
			},
			error: function(err) {
				console.log(err.responseText);
				$("#swipeResults").prepend("<span style='color: red'>" + JSON.parse(err.responseText).error.message + "</span> <br />");
			}
		});
	});
}]);