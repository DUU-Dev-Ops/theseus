var committeeDashCtrl = angular.module('committeeDashCtrl',[]);
committeeDashCtrl.controller('committeeDashCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    var currentCommittee = $routeParams.committee;
    $scope.committee = currentCommittee;    
    $http({
          method: 'GET',
          url: '/api/events/'+currentCommittee
          }).then(function successCallback(response) {
            $scope.events = response;
          }, function errorCallback(response) {
            $scope.errorGetEvent = true;
  });
    $scope.expand = function(event){
        $scope.activeEvent = event;
    };
}]);
committeeDashCtrl.filter('dateFormat', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
 
  return _date.toUpperCase();

 };
});