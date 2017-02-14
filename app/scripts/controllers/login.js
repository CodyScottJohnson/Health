'use strict';

/**
 * @ngdoc function
 * @name Health.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('LoginCtrl', function ($scope, User) {
    $scope.Login = function(Username,Password){
        User.Login(Username,Password);
      };
  });
