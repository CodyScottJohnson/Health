'use strict';

/**
 * @ngdoc service
 * @name Health.Functions
 * @description
 * # Functions
 * Factory in the Health.
 */
angular.module('Health')
  .factory('Functions', function ($uibModal) {
    // Service logic
    // ...
    var Functions = {};
    Functions.OpenModal = function(modalname,size,data,options){
    var default_options = {
     animation: true,
     templateUrl: modalname,
     controller: 'ModalCtrl',
     size: size,
     resolve: {
       items: function () {
         return data;
       }
     }
   };
   default_options = _.assign(default_options,options);
    var modalInstance = $uibModal.open(default_options);
   modalInstance.result.then(function (selectedItem) {
     //console.log(selectedItem);
   }, function () {
     console.log('done');
   });

  };
  return Functions;
  });
