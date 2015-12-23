var app = angular.module('myApp', []);
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
    
    
