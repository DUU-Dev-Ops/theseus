var signupController = angular.module('signupController',[]);
signupController.controller('signupController',['$scope', '$http',function($scope, $http){
    $scope.username=""
    $scope.password=""
    $scope.register = function(){
      var response = $http.post('/register',{
        "username":$scope.username,
        "password":$scope.password
      });
      response.success(function(data,status,headers,config){
           alert("registration succeeded");
      });
      response.error(function(data,status,headers,config){
           alert("resgistration failed");    
      });
    };
}]);
