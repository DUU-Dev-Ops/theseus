var committeeDashCtrl = angular.module('committeeDashCtrl', ['datatables', 'ngResource']);
committeeDashCtrl.controller('committeeDashCtrl', ['$scope', '$http', '$routeParams', '$resource', function($scope, $http, $routeParams, $resource) {
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
        file: ""
    };
    $http({
        method: 'GET',
        url: '/api/events/' + currentCommittee
    }).then(function successCallback(response) {
        $scope.events = response.data;
        $scope.showInfoFor($scope.events[0]);
    }, function errorCallback(response) {
        $scope.errorGetEvent = true;
    });

    // Set up socket connection
    var initSocket = function() {
        var socket = io();
        socket.emit('room', $scope.committee);
        socket.on('swipe', function(data) {
            console.log("Swope");
            $scope.$apply(function(scope) {
                var event = data.event;
                var oldEvent = _.findWhere(scope.events, { '_id': event._id });
                if (oldEvent) oldEvent.attendance = event.attendance;
            });
        });
    }

    // Add selected event to activeEvents before making graph

    $scope.select = function(event) {
        var index = $scope.activeEvents.indexOf(event);
        if (index > -1) {
            $scope.activeEvents.splice(index, 1);
            event.selected = false;
        } else {
            $scope.activeEvents.push(event);
            event.selected = true;
        }
        $scope.showActiveEvents = $scope.activeEvents.length > 0;
    };
    $scope.showInfoFor = function(event) {
        $scope.currentEvent = event;
        $scope.submitFailure = false;
        $scope.submitSuccess = false;
    };

    $scope.submitForm = function() {
        var event = $scope.currentEvent;
        var response = $http.post('/api/event/' + event._id + '/update', event);
        response.success(function(data, status, headers, config) {
            $scope.submitSuccess = true;
            $scope.edit_enabled = false;
            $scope.serverMsg = data;
        });
        response.error(function(data, status, headers, config) {
            alert("post failure");
            $scope.submitFailure = true;
        });
    };
    $scope.genDGDump = function() {
        var output = "";
        var attendance = $scope.currentEvent.attendance;
        for (var i = 0; i < attendance.length; i++) {
            output += attendance[i].firstName.toLowerCase() + "." + attendance[i].lastName.toLowerCase() + "@duke.edu\n";
        }
        var blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "AttendanceData.txt");
    };

    $scope.genCSV = function() {
        var output = "First Name, Last Name, NetID, Grad Year, School, Time Swiped, Time Since Start\n";
        var attendance = $scope.currentEvent.attendance;
        for (var i = 0; i < attendance.length; i++) {
            output += [attendance[i].firstName, attendance[i].lastName, attendance[i].netid, attendance[i].gradYear, attendance[i].school, attendance[i].timeSwiped, attendance[i].timeSinceStart].join(',') + "\n";
        }
        var blob = new Blob([output], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "AttendanceData.csv");

    };

    initSocket();

}]);

committeeDashCtrl.run(function(DTDefaultOptions) {
    DTDefaultOptions.setDisplayLength(10);
});

committeeDashCtrl.filter('dateFormat', function($filter) {
    return function(input) {
        if (input == null) {
            return "";
        }

        var _date = $filter('date')(new Date(input), 'MM/dd/yyyy @h:mma');

        return _date.toUpperCase();

    };
});
