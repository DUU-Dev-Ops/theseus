angular.module('attendanceGraph',[]).directive('attendanceGraph', function() {
	return {
		restrict: 'E',
		template: '<nvd3 options="line" data="graphData.attendance" api="nvd3api"></nvd3> Demographic: <select class="form-control" ng-model="selectedProperty"><option value="" disabled selected>-- Select a Property --</option><option ng-repeat="dem in dems" value={{dem}}>{{dem}}</option></select> <nvd3 options="pie" data="graphData[selectedProperty]"></nvd3>',	
		scope: {
			data: "="
		},
		link: function($scope, element, attrs) {
			$scope.dems = ['school', 'year'];
			$scope.graphData = {};
			$scope.$watch('data', function() {
				console.log("hi");
				console.log($scope.data)
				$scope.graphData.school = {}
				$scope.graphData.year = {}
				_.map($scope.data, function(a) {
					$scope.graphData.school[a.school] = ($scope.graphData.school[a.school] || 0) + 1;
					$scope.graphData.year[a.gradYear] = ($scope.graphData.year[a.gradYear] || 0) + 1;
				});
				$scope.graphData.school = _.pairs($scope.graphData.school);
				$scope.graphData.year = _.pairs($scope.graphData.year);

				var sortedAttendance = _.sortBy($scope.data, function(a) {return a.timeSinceStart});
				var acc = 0;
				var attendanceMap = {};
				$scope.graphData.attendance = [{"x": 0, "y": 0}];
				_.map(sortedAttendance, function(a) {acc++; attendanceMap[a.timeSinceStart] = acc;});
				_.mapObject(attendanceMap, function(v, k) {$scope.graphData.attendance.push({"x": parseFloat(k), "y": parseFloat(v)})});
				$scope.graphData.attendance = [{values: $scope.graphData.attendance, key: "Attendance"}];
			}, true);
			$scope.line = {
				chart: {
					type: "lineChart",
					height: 200,
					margin: {
						top: 20,
						right: 20,
						bottom: 40,
						left: 55
					},
					x: function(d){return parseInt(d.x);},
					y: function(d){return parseInt(d.y);},
					xAxis: {
						"axisLabel": "Time Since Event Start (min)",
						"axisLabelDistance": -10
					},
					yAxis: {
						"axisLabel": "Attendance",
						"axisLabelDistance": -12
					}
				}
			}
			$scope.pie = {
				chart: {
					type: 'pieChart',
					height: 200,
					showValues: true,
					x: function(d){return d[0];},
					y: function(d){return d[1];},
					showLabels: false,
					duration: 500,
					legend: {
						margin: {
							top: 5,
							right: 35,
							bottom: 5,
							left: 0
						}
					}
				}
			}
		}
	}
});






