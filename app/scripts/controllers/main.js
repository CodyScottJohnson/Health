'use strict';

/**
 * @ngdoc function
 * @name jfsPublicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jfsPublicApp
 */
angular.module('Health')
  .controller('MainCtrl', function ($scope, $document,Data,Functions, Running,$window, $timeout) {
    $scope.selectedMonth = {style:{"left":"932px","top":"294px"},state:'detail'};
    $scope.showMonthPanel = false;
    $scope.spark=[{'name':'weight',datapoint:1,sort:'2016-09-01'},{'name':'weight',datapoint:4,sort:'2016-09-02'},{'name':'weight',datapoint:2,sort:'2016-09-03'},{'name':'weight',datapoint:3,sort:'2016-09-04'}];
    console.log($scope.spark);
    Running.getRunDataMonthDetail().then(function(data){ $scope.selectedMonth.list = data;});
    $scope.drawMonthGraphs = function(){
      $timeout(function() {
        $scope.selectedMonth.draw = !$scope.selectedMonth.draw;
      }, 10);
    };
    $scope.MonthDetail = function(i,row,x,y){
      console.log(row);
      Running.getRunDataMonthDetail(row.Year,row.Month).then(function(data){
      $scope.showMonthPanel = true;
      $scope.selectedMonth.list = data;

      if(x+500 > $window.innerWidth){
        x = $window.innerWidth - 500;
      }
      $scope.selectedMonth.style.left = x+'px';
      $scope.selectedMonth.style.top = y+'px';
      //$scope.$apply();

      $timeout(function() {
        $scope.selectedMonth.draw = !$scope.selectedMonth.draw;
      }, 10);
      });
    };
    $scope.hideMonthPanel = function(){
      $scope.showMonthPanel = false;
    };
    $scope.MonthDisplay={key:['Month_Runs'],title:'Number of Runs'};
          $scope.changeMonthView = function() {
              var temp = $scope.RunsByMonth;
              //console.log('change')
              //$scope.RunsByMonth = null;
            };
          $scope.colors = ['#f97072','red', 'yellow', 'green', 'orange', 'black'];
          $scope.showRunDetail = function(runID){
            Running.getSpecificRuns([runID]).then(function(data){
              console.log('done');
              Functions.OpenModal("app/pages/running/modals/rundetail/rundetail.html",'lg',data,'RunDetailCtrl',{windowClass:'notification_modal'});
            });
          };
          $scope.runData = [];

          Running.getRunDataAll().then(function(data) {
            $scope.allRuns = data;
          });
          Running.getRunDataMonth().then(function(data) {
              $scope.RunsByMonth = data;
              //console.log(data)
              $scope.areaLineData = {
                  labels: [],
                  series: [
                      []

                  ]
              };
              angular.forEach(data, function(value, key) {
                  $scope.areaLineData.labels.push(value.Label);
                  $scope.areaLineData.series[0].push(value.Month_Runs);
              });
              //console.log($scope.areaLineData.labels)
              //new Chartist.Line('#area-chart', $scope.areaLineData, $scope.areaLineOptions);
          });
          $scope.getAllData = function(url) {
              $scope.getRunData(url)
                  .then(function(data) {
                      angular.extend($scope.runData, data.items);
                      //console.log($scope.runData);
                      //if(data.items.length >=25){
                      //  $scope.getAllData(data.next)
                      //  }

                  });


          };
          $scope.hideAxes = function(x) { return ''; };
          $scope.updateAll = function(){
            Running.updateAllFromSource().then(function(data){
              Running.updateDetailFromSource();
              Running.getRunDataMonth().then(function(data) {
                  $scope.RunsByMonth = data;
              });
            Running.getRunDataAll().then(function(data) {
                $scope.allRuns = data;
                console.log(data);
              });
            });
          };
    $scope.showRunDetail = function(runID){
        Running.getSpecificRuns([runID]).then(function(data){
            Functions.OpenModal("views/Modals/RunDetail.html",'lg',data,'RundetailCtrl',{windowClass:'notification_modal'});
        });
    };


  });
