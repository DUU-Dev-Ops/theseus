var app = angular.module('myApp', ['ngRoute', 'nvd3', 'attendanceGraph', 'mainController', 'eventFormController', 'committeeDashCtrl', 'comparisonController', 'swipeController', 'loginController', 'signupController']);

/*
 * FRONT END ROUTING
 * This is a single page app. Navigating to different pages based
 * on the routes below loads a different page template into the
 * page body and sets a different controller for that view.
 * When new pages/views are added, be sure to update routing below
 * as needed.
 */
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    }).when('/new', {
        templateUrl: 'pages/new.html',
        controller: 'eventFormController',
        resolve: {
            factory: checkRouting
        }
    }).when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    }).when('/signup', {
        templateUrl: 'pages/signup.html',
        controller: 'signupController'
    }).when('/committee-dashboard', {
        templateUrl: 'pages/all_committees.html',
        controller: 'eventFormController',
        resolve: {
            factory: checkRouting
        }
    }).when('/committee/:committee', {
        templateUrl: 'pages/committee_dashboard.html',
        controller: 'committeeDashCtrl',
        resolve: {
            factory: checkRouting
        }
    }).when('/comparison/:committee', {
        templateUrl: 'pages/comparison.html',
        controller: 'comparisonController',
        resolve: {
            factory: checkRouting
        }
    }).when('/swipe/:eventID', {
        templateUrl: 'pages/swipe_input.html',
        controller: 'swipeController',
        resolve: {
            factory: checkRouting
        }
    }).otherwise({ redirectTo: '/' })
});


app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            $(function() {
                element.datepicker({
                    dateFormat: 'mm/dd/yy',
                    onSelect: function(date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

var checkRouting = function($q, $http, $rootScope, $location) {
    if ($rootScope.currentUser) {
        return true;
    } else {
        var deferred = $q.defer();
        $http.get("/me")
            .success(function(response) {
                $rootScope.currentUser = response.user;
                deferred.resolve(true);
            })
            .error(function(error, status) {
                deferred.reject();
                $location.path("/login");
            });
        return deferred.promise;
    }
};
