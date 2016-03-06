var comparisonController = angular.module('comparisonController',[]);
comparisonController.controller('comparisonController',['$scope', '$routeParams', '$http',function($scope, $routeParams, $http){
    $scope.committee = $routeParams.committee;
    $scope.selectedEvents = [null, null];

    $http.get('/api/events/' + $scope.committee)
    .success(function(data,status,headers,config){
        $scope.events = data;
    })
    .error(function(data,status,headers,config){
        alert("Failed to retrieve events for this committee. Errors printed to console.");
        console.log(data);
    });

    $scope.revealBreakdown = function() {
        $('.breakdown').slideToggle(); window.dispatchEvent(new Event('resize'));
    }

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
