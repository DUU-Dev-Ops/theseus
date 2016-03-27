var committeeDashCtrl = angular.module('committeeDashCtrl',['datatables','ngResource']);
committeeDashCtrl.controller('committeeDashCtrl',['$scope','$http','$routeParams','$resource',function($scope,$http,$routeParams,$resource){
    var currentCommittee = $routeParams.committee;
    $scope.committee = currentCommittee; 
    $scope.activeEvents = [];
    $scope.errorGetEvent = false;
    $scope.showActiveEvents = false;
    $scope.displayGraph = false;
    $scope.displayInfo = false;
    $scope.fileDNE = {
        status: false,
        file:""
    };
    $http({
          method: 'GET',
          url: '/api/events/'+currentCommittee
          }).then(function successCallback(response) {
            $scope.events = response.data;
		$scope.showInfoFor($scope.events[0]);
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
	$scope.genDGDump = function() {
		var output = "";
		var attendance = $scope.currentEvent.attendance;
		for(var i = 0; i < attendance.length; i++) {
			output += attendance[i].firstName.toLowerCase() + "." + attendance[i].lastName.toLowerCase() + "@duke.edu\n";
		}
		var blob = new Blob([output], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "AttendanceData.txt");	
		
	};

	$scope.genCSV = function() {
                var output = "First Name, Last Name, NetID, Grad Year, School, Time Swiped, Time Since Start\n";
                var attendance = $scope.currentEvent.attendance;
                for(var i = 0; i < attendance.length; i++) {
                        output += [attendance[i].firstName, attendance[i].lastName, attendance[i].netid, attendance[i].gradYear, attendance[i].school, attendance[i].timeSwiped, attendance[i].timeSinceStart].join(',') + "\n";
                }
                var blob = new Blob([output], {type: "text/csv;charset=utf-8"});
                saveAs(blob, "AttendanceData.csv");

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
 
  var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
 
  return _date.toUpperCase();

 };
});

/**************************************
 * Simple test data generator
 */
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}
