var eventFormController = angular.module('eventFormController',[]);
eventFormController.controller('eventFormController',['$scope','$http',function($scope,$http){
    $scope.invalidForm = false;
    $scope.submitSuccess = false;
    $scope.showNewEventForm = true;
    $scope.event={
        event_name:'', // title
        timeCreated:'', // timeCreated
        loc:'', //location
        loc_desc:'', // ADD FIELD
        committee:'',
        date_start:'',
        date_end:'',
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
            var dateTimeStart = new Date($scope.event.date_start+' '+$scope.event.start_time);
            var dateTimeEnd = new Date($scope.event.date_end+' '+$scope.event.end_time);
            var data = {
                  committee: $scope.event.committee[0],
                  event_name: $scope.event.event_name,
                  loc: { 
                    location_str: 		$scope.event.loc,
                    location_desc:		$scope.event.loc_desc,    
                  },
                  start_time:			dateTimeStart.toUTCString(),
                  end_time:				dateTimeEnd.toUTCString(), 
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