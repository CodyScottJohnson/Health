'use strict';

/**
 * @ngdoc function
 * @name Health.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('MainCtrl', function(Functions,  $timeout, Socket, $scope, $rootScope, User) {
    console.log($rootScope.currentUser);
    $scope.logout = function(){
      User.logout();
    };

  });
