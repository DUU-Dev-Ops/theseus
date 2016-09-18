var loginController = angular.module('loginController',[]);
loginController.controller('loginController',['$scope','$http',function($scope,$http){
    $scope.email = ""
    $scope.psd = ""
    $scope.login = function(){
      var response = $http.post('/login',{
        "username":$scope.email,
        "password":$scope.psd
      });
      response.success(function(data,status,headers,config){
           alert("login success");
      });
      response.error(function(data,status,headers,config){
           alert("login failed");    
      });
    };
}]);