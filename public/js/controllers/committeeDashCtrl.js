var committeeDashCtrl = angular.module('committeeDashCtrl',['datatables','ngResource']);
committeeDashCtrl.controller('committeeDashCtrl',['$scope','$http','$routeParams','$resource',function($scope,$http,$routeParams,$resource){
    var currentCommittee = $routeParams.committee;
    $scope.committee = currentCommittee; 
    $scope.activeEvents = [];
    $scope.errorGetEvent = false;
    $scope.showActiveEvents = false;
    $scope.displayGraph = false;
    $scope.displayInfo = false;
    $scope.edit_enabled = false;
    $scope.fileDNE = {
        status: false,
        file:""
    };
    $http({
          method: 'GET',
          url: '/api/events/'+currentCommittee
          }).then(function successCallback(response) {
            $scope.events = response.data;
//            console.log($scope.events);
          }, function errorCallback(response) {
            $scope.errorGetEvent = true;
  });
    

    // Add selected event to activeEvents before making graph
  
    $scope.select = function(event){
        var index = $scope.activeEvents.indexOf(event);
        if(index>-1){
            $scope.activeEvents.splice(index,1);
            event.selected = false;
        }else{
            $scope.activeEvents.push(event);
            event.selected = true;
        }
        $scope.showActiveEvents = $scope.activeEvents.length>0;
//        console.log($scope.activeEvents);
    };
    $scope.showInfoFor = function(event){
        console.log(event);
       // $scope.hasGraph = true;
        $scope.currentEvent = event;
       // $scope.displayGraph = false;
       // $scope.displayInfo = true;
    };
    
    $scope.submitForm = function(){
        
    };
}]);

committeeDashCtrl.run(function(DTDefaultOptions){
    DTDefaultOptions.setDisplayLength(10);
});

committeeDashCtrl.filter('dateFormat', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MM/dd/yyyy @h:mma');
 
  return _date.toUpperCase();

 };
});

