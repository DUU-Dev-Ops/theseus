var emailGenApp = angular.module('emailGenApp', ['ui.sortable', 'ngMaterial']);

emailGenApp.controller('EmailGenCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.events = [];
    $scope.console = console;

    $scope.date = new Date();

    var reader = new FileReader;


    reader.onload = function(e) {
        var cleanCSV = reader.result.replace(/\cM/g, "\n"); // Remove pesky ^M chracters
        $scope.events = $.grep($.csv.toObjects(cleanCSV), function(e) {
            return e['Event Title'] != null;
        });

        $scope.events = $.map($scope.events, function(e) {
            if (e["Event Blurb"].length > 147) {
                e["Event Blurb"] = e["Event Blurb"].substring(0, 147) + "...";
            }
            return e;
        });
        $scope.$apply()
    }

    $("#csv-input").on('change', function() {
        reader.readAsText($("#csv-input")[0].files[0]);
        $scope.selFile = $("#csv-input")[0].files[0].name;
        console.log($scope.selFile);
    });

    $scope.saveHTML = function() {
        var blob = new Blob([$("#generated-email").html()], { type: "text/html;charset=utf-8" });
        saveAs(blob, "email.html");
    }
    $scope.deleteEvent = function(event) {
        console.log(event)
        var removeIndex = $scope.events.indexOf(event);
        $scope.events.splice(removeIndex, 1);
    }
    $scope.newEvent = function() {
            if (!$scope.events) $scope.events = [];
            var eventModel = { "Timestamp": "/7/16 21:32", "Event Title": "Untitled Event", "DUU Committee(s) Involved with Event": "LDOC", "Event Blurb": "", "Hyperlinks to Include (if multiple, separate by commas)": "" };
            $scope.events.unshift(eventModel);
        }
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };


    $scope.toggleLeft = buildDelayedToggler('left');
});
emailGenApp.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
        $mdSidenav('left').close()
            .then(function() {
                $log.debug("close LEFT is done");
            });
    };
})
