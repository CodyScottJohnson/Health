'use strict';

/**
 * @ngdoc service
 * @name Health.Weather
 * @description
 * # Weather
 * Service in the Health.
 */
angular.module('Health')
  .service('Weather', function ($http,ENV) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    $http({
      method: 'GET',
      url: ENV.API+'Avalanche',

    }).then(function(data) {
      console.log(data.data);
    }, function(error) {

    });
  });
