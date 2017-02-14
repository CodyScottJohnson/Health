'use strict';

/**
 * @ngdoc function
 * @name Health.controller:RunningCtrl
 * @description
 * # RunningCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('RunningCtrl', function($scope, $document,Data,Functions, Running,$window, $timeout,$interval, ENV, $location) {
    //eyJkYXRhIjp7InIiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvIyEvUnVubmluZyIsImMiOiI2Njg5NmUyZTU2ZWQ0OTU2OWE2ZmNhYzVmNzNlOTRiMiIsInQiOjE0ODcwMTc3Njg2ODAsInUiOjI1MTU4NDc2fSwibWFjIjoiTndPKzduK281eGdrQ3ZZTDJiUXpoMm1MN0JyeGQ3b0M2N2c3NEtMbGY5bz0ifQ
    console.log(Functions.GetParams(window.location.search));
    $scope.Running = Running.data;
    $scope.UpdateAll = function(){
      Running.updateAllFromSource().then(function(){
        Running.getRunDataAll();
        Running.getRunDataMonth();
      });
      Running.updateDetailFromSource();

    };
    $scope.drawMonthGraphs = function() {
      $timeout(function() {
        $scope.Running.selectedMonth.draw = !$scope.Running.selectedMonth.draw;
      }, 10);
    };
    $scope.MonthDetail = function(i, row, x, y) {
      console.log(row);
      Running.getRunDataMonthDetail(row.Year, row.Month).then(function(data) {
        $scope.showMonthPanel = true;

        if (x + 500 > $window.innerWidth) {
          x = $window.innerWidth - 500;
        }
        $scope.Running.selectedMonth.style.left = x + 'px';
        $scope.Running.selectedMonth.style.top = y + 'px';
        //$scope.$apply();

        $timeout(function() {
          $scope.Running.selectedMonth.draw = !$scope.Running.selectedMonth.draw;
        }, 10);
      });
    };
    $scope.hideMonthPanel = function() {
      $scope.showMonthPanel = false;
    };
    $scope.MonthDisplay = {
      key: ['Month_Runs'],
      title: 'Number of Runs'
    };
    $scope.changeMonthView = function() {
      var temp = $scope.RunsByMonth;
      //console.log('change')
      //$scope.RunsByMonth = null;
    };
    $scope.colors = ['#f97072', 'red', 'yellow', 'green', 'orange', 'black'];
    $scope.showRunDetail = function(runID) {
      Running.getSpecificRuns([runID]).then(function(data) {
        console.log('done');
        Functions.OpenModal("app/pages/running/modals/rundetail/rundetail.html", 'lg', data, 'RunDetailCtrl', {
          windowClass: 'notification_modal'
        });
      });
    };
    $scope.runData = [];

    Running.getRunDataAll();
    Running.getRunDataMonth();
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
    $scope.hideAxes = function(x) {
      return '';
    };

    $scope.showRunDetail = function(runID) {
      Running.getSpecificRuns([runID]).then(function(data) {
        Functions.OpenModal("views/Modals/RunDetail.html", 'lg', data, 'RundetailCtrl', {
          windowClass: 'notification_modal'
        });
      });
    };
  });
