
var app = angular.module('myApp', ['ngRoute','mainController','eventFormController','committeeDashCtrl']);

/* 
 * FRONT END ROUTING
 * This is a single page app. Navigating to different pages based 
 * on the routes below loads a different page template into the 
 * page body and sets a different controller for that view.
 * When new pages/views are added, be sure to update routing below
 * as needed. 
 */
app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'pages/home.html',
		controller : 'mainController'
	}).when('/new',{
	    // New Event page:     
		templateUrl : 'pages/new.html',
		controller : 'eventFormController'
	}).when('/committee-dashboard',{
        templateUrl : 'pages/all_committees.html',
        controller : 'eventFormController'
    }).when('/committee/:committee',{
        templateUrl : 'pages/committee_dashboard.html',
        controller : 'committeeDashCtrl'
    }).otherwise({redirectTo: '/'})
});


app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'mm/dd/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});
    
    
