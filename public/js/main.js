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
        event_name:'', // title
        timeCreated:'', // timeCreated
        loc:'', //location
        committee:'',
        date:'',
        start_time:'', //timeFrom
        end_time:'', //timeTo
        links:'', //fbLink CONVERT TYPE []
        event_desc:'', //eventDes
        notes:'',
        primary_duu_contacts:{
            contact_name:'',
            contact_info:'',
        }, //contactName TYPE []
        primary_ext_contacts:{
            contact_name:'',
            contact_info:'',
        }, // NEED TO ADD FIELD TYPE []
        contactNetID:'', // DELETE
        restricted_access:'', //ADD FIELD, TYPE bool
        is_public:'', // ADD FIELD, TYEP bool
        incomplete_access_option: false,
        incomplete_public_option: false,
    };

    $scope.submitForm=function(){
      //post form to server
        if($scope.event.restricted_access===''){
            $scope.event.incomplete_access_option = true;
            $scope.submitSuccess = false;
            $scope.invalidForm = true;
            return;
        }
        if($scope.event.is_public === ''){
            $scope.event.incomplete_public_option = true;
            $scope.submitSuccess = false;
            $scope.invalidForm = true;
            return;
        }
        if($scope.newEventForm.$valid){
            $scope.event.links = [$scope.event.links];
            $scope.event.primary_duu_contacts = [$scope.event.primary_duu_contacts];
            $scope.event.primary_ext_contacts = [$scope.event.primary_ext_contacts];
            $scope.event.restricted_access = Boolean($scope.event.restricted_access);
            $scope.event.is_public = Boolean($scope.event.is_public);
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
    
    
