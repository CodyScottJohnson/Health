'use strict';

/**
 * @ngdoc service
 * @name Health.Functions
 * @description
 * # Functions
 * Factory in the Health.
 */
angular.module('Health')
  .factory('Functions', function ($uibModal, $rootScope) {
    // Service logic
    // ...
    var Functions = {};
    Functions.SendSocket = function(data){
      console.log('here');
        $rootScope.conn.send(angular.toJson(data));
    };
    Functions.GetParams = function(qstr){
      var query = {};
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    };
    Functions.OpenModal = function(modalname,size,data,ctrl,options){
    var default_options = {
     animation: true,
     templateUrl: modalname,
     controller: ctrl,
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
