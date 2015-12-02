var app = angular.module('myApp', []);
app.controller('eventFormController',['$scope','$http',function($scope,$http){
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
    
    