var loginController = angular.module('loginController', []);
loginController.controller('loginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.email = ""
    $scope.psd = ""
    $scope.login = function() {
        var response = $http.post('/login', {
            "username": $scope.email,
            "password": $scope.psd
        });
        response.success(function(data, status, headers, config) {
            $location.path("/committee-dashboard");
        });
        response.error(function(data, status, headers, config) {
            alert("login failed");
        });
    };
}]);
