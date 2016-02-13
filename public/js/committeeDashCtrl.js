var committeeDashCtrl = angular.module('committeeDashCtrl',['datatables','ngResource']);
committeeDashCtrl.controller('committeeDashCtrl',['$scope','$http','$routeParams','$resource',function($scope,$http,$routeParams,$resource){
    var currentCommittee = $routeParams.committee;
    $scope.committee = currentCommittee;   
    $scope.activeEvents = [];
    $scope.errorGetEvent = false;
    $scope.showActiveForm = false;
    $scope.fileDNE = {
        status: false,
        file:""
    };
    $http({
          method: 'GET',
          url: '/api/events/'+currentCommittee
          }).then(function successCallback(response) {
            $scope.events = response.data;
            console.log($scope.events);
          }, function errorCallback(response) {
            $scope.errorGetEvent = true;
  });
    

    // Add selected event to activeEvents before making graph
  
    $scope.select = function(event){
        var index = $scope.activeEvents.indexOf(event);
        if(index>-1){
            $scope.activeEvents.splice(index,1);
            event.selected = false;
        }else{
            $scope.activeEvents.push(event);
            event.selected = true;
        }
        $scope.showActiveForm = $scope.activeEvents.length>0;
        console.log($scope.activeEvents);
    };
    
    
    // Make new graph based on event elected. Can now only make graph for one event at a time.
    $scope.showGraph = function(){
        //    Configure NVD3 Line Graph
                nv.addGraph(function() {
          var chart = nv.models.lineChart()
                        .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                        .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
//                        .transitionDuration(350)  //how fast do you want the lines to transition?
                        .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                        .showYAxis(true)        //Show the y-axis
                        .showXAxis(true)        //Show the x-axis
          ;

          chart.xAxis     //Chart x-axis settings
              .axisLabel('Time (ms)')
              .tickFormat(d3.format(',r'));

          chart.yAxis     //Chart y-axis settings
              .axisLabel('Voltage (v)')
              .tickFormat(d3.format('.02f'));

          /* Done setting the chart up? Time to render it!*/
          var myData = sinAndCos();   //You need data...

          d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
              .datum(myData)         //Populate the <svg> element with chart data...
              .call(chart);          //Finally, render the chart!

          //Update the chart when window resizes.
          nv.utils.windowResize(function() { chart.update() });
          return chart;
        });
         
         
//        var eventid = $scope.activeEvents[0]._id;
//        var path = '../swipe_data/'+eventid+'.csv';
        
        // Test if file exists
//        $http({
//            method:'GET',
//            url: path
//        }).then(function successCallBack(response){
//            // File exists, make graph
//            $scope.fileDNE.status = false;
//            $scope.hasGraph = true;
//            var g = new Dygraph(graphDiv,path,{
//            legend: 'always',
//            title:'Swipe Frequency vs. Time',
//            showRoller: false,
//            ylabel:'Swipe Freq',
//            showRangeSelector: true,
//            rangeSelectorHeight: 30,
//            rangeSelectorPlotStrokeColor: 'yellow',
//            rangeSelectorPlotFillColor: 'lightyellow'
//        });
//        }, function errorCallBack(response){
//            // File doesn't exist
//            $scope.hasGraph = false;
//            $scope.fileDNE.status = true;
//            $scope.fileDNE.file = $scope.activeEvents[0].event_name;
//        });
    };
//    end make new graph
}]);

committeeDashCtrl.run(function(DTDefaultOptions){
    DTDefaultOptions.setDisplayLength(10);
});

committeeDashCtrl.filter('dateFormat', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MM/dd/yyyy');
 
  return _date.toUpperCase();

 };
});

/**************************************
 * Simple test data generator
 */
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}
