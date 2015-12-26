var app = angular.module('myApp', ['ngRoute']);

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
	});

	// New Event page: 
	$routeProvider.when('/new',{
		templateUrl : 'pages/new.html',
		controller : 'eventFormController'
	});

});
app.controller('mainController',['$scope','$http',function($scope,$http){


}]);
app.controller('eventFormController',['$scope','$http',function($scope,$http){
    $scope.invalidForm = false;
    $scope.submitSuccess = false;
    $scope.showNewEventForm = true;
    $scope.event={
        title:'',
        timeCreated:'',
        location:'',
        committee:'',
        date:'',
        timeFrom:'',
        timeTo:'',
        fbLink:'',
        eventDes:'',
        notes:'',
        contactName:'',
        contactNetID:'',
    };
    $scope.submitForm=function(){
      //post form to server
        if($scope.newEventForm.$valid){   
            var response = $http.post('/api/events',$scope.event);
			console.log($scope.event);
			console.log(response);
            response.success(function(data,status,headers,config){
                $scope.submitSuccess = true;
                $scope.invalidForm = false;
                $scope.showNewEventForm = false;
                $scope.serverMsg = data;
            });
            response.error(function(data,status,headers,config){
               alert("post failure"); 
            });
        }else{
            $scope.submitSuccess = false;
            $scope.invalidForm = true;
        }
    };
    
}]);

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
    
    
