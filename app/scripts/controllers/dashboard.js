'use strict';

/**
 * @ngdoc function
 * @name Health.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('DashboardCtrl', function ($scope,$window, $timeout,$interval) {
    $scope.bg ='images/Backgrounds/bg_1.jpg';
    $scope.UpdateImage = function(){
      var rint = Math.floor(Math.random() * (17 - 1 + 1)) + 1;
      //rint =18;
      $scope.bg ='images/Backgrounds/bg_'+rint+'.jpg';
    };
    $scope.UpdateImage();
    $scope.imageUpdate = $interval($scope.UpdateImage,10000);
    $scope.spark={x:'sort',y:'datapoint',
     data:[{'name':'weight',datapoint:1,sort:'2016-09-01'},{'name':'weight',datapoint:4,sort:'2016-09-02'},{'name':'weight',datapoint:2,sort:'2016-09-03'},{'name':'weight',datapoint:3,sort:'2016-09-04'}]
   };
   $scope.weight={};
   $scope.vitals={};
   $scope.exercise={};
  });
