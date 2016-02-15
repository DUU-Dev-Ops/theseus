var comparisonController = angular.module('comparisonController',[]);
comparisonController.controller('comparisonController',['$scope', '$routeParams', '$http',function($scope, $routeParams, $http){
    $scope.committee = $routeParams.committee;
    $scope.selectedEvents = [null, null];
    $scope.data = [{}, {}];
    $scope.dems = ['gender', 'year', 'school'];

    $http.get('/api/events/' + $scope.committee)
    .success(function(data,status,headers,config){
        $scope.events = data;
    })
    .error(function(data,status,headers,config){
        alert("Failed to retrieve events for this committee. Errors printed to console.");
        console.log(data);
    });

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
              "axisLabel": "Attendance"
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

    $scope.$watch('selectedEvents', function() {
        for(var i = 0; i < 2; i++) {
            if($scope.selectedEvents[i]) {
                $scope.data[i].gender = {}
                $scope.data[i].school = {}
                $scope.data[i].year = {}
                _.map($scope.selectedEvents[i].attendance, function(a) {
                    $scope.data[i].gender[a.gender] = ($scope.data[i].gender[a.gender] || 0) + 1;
                    $scope.data[i].school[a.school] = ($scope.data[i].school[a.school] || 0) + 1;
                    $scope.data[i].year[a.class_year] = ($scope.data[i].year[a.class_year] || 0) + 1;
                });
                $scope.data[i].gender = _.pairs($scope.data[i].gender);
                $scope.data[i].school = _.pairs($scope.data[i].school);
                $scope.data[i].year = _.pairs($scope.data[i].year);

                var sortedAttendance = _.sortBy($scope.selectedEvents[i].attendance, function(a) {return a.time_since_start});
                var acc = 0;
                var attendanceMap = {};
                $scope.data[i].attendance = [{"x": 0, "y": 0}];
                _.map(sortedAttendance, function(a) {acc++; attendanceMap[a.time_since_start] = acc;});
                _.mapObject(attendanceMap, function(v, k) {$scope.data[i].attendance.push({"x": parseFloat(k), "y": parseFloat(v)})});
                $scope.data[i].attendance = [{values: $scope.data[i].attendance, key: "Attendance"}];
            }
        }
    }, true);

    $scope.revealBreakdown = function() {
        $('.breakdown').slideToggle(); window.dispatchEvent(new Event('resize'));
    }

    $scope.getComparisonClass = function(v1, v2) {
        if($scope.highlightDifferences) {
            if(v1 instanceof Array && v2 instanceof Array) {
                if(v1.length > 0 && v1[0].contact_name) {
                    v1 = _.map(v1, function(v) {return v.contact_name});
                }
                if(v2.length > 0 && v2[0].contact_name) {
                    v2 = _.map(v2, function(v) {return v.contact_name});
                }
                return _.isEqual(v1,v2) ? "success" : "danger";
            }
            return (v1 === v2) ? "success" : "danger";
        }
    }
}]);