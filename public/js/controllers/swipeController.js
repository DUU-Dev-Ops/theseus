var swipeController = angular.module('swipeController',[]);
swipeController.controller('swipeController',['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	$scope.eventID = $routeParams.eventID;
	$('#swipeForm').submit(function(e) {
		e.preventDefault();
		console.log("hi");
		$.ajax({
			type: "POST",
			url: "/api/event/" + $routeParams.eventID + "/swipe",
			data: {num: $("[name=num]").val()},
			dataType: "json",
			success: function(data) {
				alert(data);
			},
			error: function(err) {
				console.log(err.responseText);
			}
		});
	});
}]);