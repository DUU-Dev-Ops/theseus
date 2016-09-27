var signupController = angular.module('signupController', []);
signupController.controller('signupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.username = ""
    $scope.password = ""
    $scope.register = function() {
        var response = $http.post('/register', {
            "username": $scope.username,
            "password": $scope.password,
            "token": $scope.token
        });
        response.success(function(data, status, headers, config) {
            $location.path("/committee-dashboard");
        });
        response.error(function(data, status, headers, config) {
            alert("registration failed");
        });
    };
}]);
