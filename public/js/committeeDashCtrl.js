var committeeDashCtrl = angular.module('committeeDashCtrl',[]);
committeeDashCtrl.controller('committeeDashCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    var currentCommittee = $routeParams.committee;
    $scope.committee = currentCommittee;   
    $scope.activeEvents = [];
    $scope.errorGetEvent = false;
    $scope.showActiveForm = false;
    $scope.fileDNE = {
        status: false,
        file:""
    };
    $http({
          method: 'GET',
          url: '/api/events/'+currentCommittee
          }).then(function successCallback(response) {
            $scope.events = response.data;
//            console.log($scope.allEvents);
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
        $scope.showActiveForm = $scope.activeEvents.length>0;
        console.log($scope.activeEvents);
    };
    
    
    // Make new graph based on event elected. Can now only make graph for one event at a time.
    $scope.showGraph = function(){
        var graphDiv = document.getElementById("graphdiv");
        // clear previous graph
        graphDiv.innerHTML = "";
        var eventid = $scope.activeEvents[0]._id;
        var path = '../swipe_data/'+eventid+'.csv';
        
        // Test if file exists
        $http({
            method:'GET',
            url: path
        }).then(function successCallBack(response){
            // File exists, make graph
            $scope.fileDNE.status = false;
            var g = new Dygraph(graphDiv,path,{
            legend: 'always',
            title:'Swipe Frequency vs. Time',
            showRoller: false,
            ylabel:'Swipe Freq'
        });
        }, function errorCallBack(response){
            // File doesn't exist
            $scope.fileDNE.status = true;
            $scope.fileDNE.file = $scope.activeEvents[0].event_name;
        });
        
        
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