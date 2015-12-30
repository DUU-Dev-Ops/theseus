var app = angular.module('myApp', ['ngRoute']);

/* 
 * FRONT END ROUTING
 * This is a single page app. Navigating to  different pages based 
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

    $routeProvider.when('/comparison/:committee', {
        templateUrl: 'pages/comparison.html',
        controller: 'comparisonController'
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
        loc_desc:'', // ADD FIELD
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
            var data = {
                  committee: $scope.event.committee[0],
                  event_name: $scope.event.event_name,
                  loc: { 
                    location_str: 		$scope.event.loc,
                    location_desc:		$scope.event.loc_desc,    
                  },
                  start_time:			$scope.event.start_time,
                  end_time:				$scope.event.end_time, 
                  links:				[$scope.event.links],
                  event_desc:			$scope.event.event_desc,
                  primary_duu_contacts:	[$scope.event.primary_duu_contacts],
                  primary_ext_contacts: [$scope.event.primary_ext_contacts],
                  notes: 				$scope.event.notes,
                  attendance:			[],
                  attendance_sensor:	[],
                  sensor_count:			0,
                  est_cost:				0,
                  restricted_access:	Boolean($scope.event.restricted_access),
                  is_public:			Boolean($scope.event.is_public),
            };
            var response = $http.post('/api/events',data);
			console.log(data);
			console.log(response);
            response.success(function(data,status,headers,config){
                $scope.submitSuccess = true;
                $scope.invalidForm = false;
                $scope.showNewEventForm = false;
                $scope.serverMsg = data;
                console.log(data);
            });
            response.error(function(data,status,headers,config){
               alert("post failure"); 
                console.log(data);
                console.log(status);
            });
        }else{
            $scope.submitSuccess = false;
            $scope.invalidForm = true;
        }
    };
    
}]);

app.controller('comparisonController',['$scope', '$routeParams', '$http',function($scope, $routeParams, $http){
    $scope.committee = $routeParams.committee;
    $http.get('/api/events/' + $scope.committee)
        .success(function(data,status,headers,config){
            $scope.events = data;
        })
        .error(function(data,status,headers,config){
            alert("Failed to retrieve events for this committee. Errors printed to console.");
            console.log(data);
        });
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
    
    
