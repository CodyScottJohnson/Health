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
    Data.GetSitemap = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://jfsapp.com/Open/API/Sitemap/',
    }).then(function(data) {
      Data.data.Sitemap = data.data;
      console.log(data.data);
      deferred.resolve(data.data);

    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };
  Data.GetSitemap();
    return Data;
  });
