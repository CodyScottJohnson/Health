'use strict';

/**
 * @ngdoc function
 * @name Health.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('ModalCtrl', function ($scope,$uibModalInstance,items,$sce) {
    $scope.items=items;
    $scope.CloseModal = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
