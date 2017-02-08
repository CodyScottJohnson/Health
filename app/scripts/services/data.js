'use strict';

/**
 * @ngdoc service
 * @name JFS_Admin.Data
 * @description
 * # Data
 * Factory in the JFS_Admin.
 */
angular.module('Health')
  .factory('Data', function ($http,$q) {
    var Data = {data:{}};
    

    return Data;
  });
