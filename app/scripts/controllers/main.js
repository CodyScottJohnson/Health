'use strict';

/**
 * @ngdoc function
 * @name jfsPublicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jfsPublicApp
 */
angular.module('Health')
  .controller('MainCtrl', function ($scope, $document,Data,Functions, Running,$window) {
    $scope.selectedMonth = {style:{"left":"932px","top":"294px"}};
    console.log($scope.selectedMonth);
    Running.getRunDataMonthDetail().then(function(data){ $scope.selectedMonth.list = data;});
    $scope.MonthDetail = function(i,row,x,y){
      console.log(i,row,x,y);
      console.log($window.innerWidth);
      if(x+500 > $window.innerWidth){
        x = $window.innerWidth - 500;
      }
      $scope.selectedMonth.style['left'] = x+'px';
      $scope.selectedMonth.style['top'] = y+'px';
      $scope.$apply();
      console.log($scope.selectedMonth);

    }
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
          }


  });
