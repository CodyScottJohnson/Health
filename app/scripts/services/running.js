'use strict';

/**
 * @ngdoc service
 * @name Health.Running
 * @description
 * # Running
 * Factory in the Health.
 */
angular.module('Health')
  .factory('Running', function($http, $q, $uibModal, $rootScope, ENV) {

    var Running = {
      data: {selectedMonth:{state:'detail',draw:false,style:{}}}
    };
    Running.getRunDataMonth = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.UserUrl + 'Run/Month/All',
      }).then(function(data) {
        Running.data.RunsByMonth=data.data;
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    Running.getRunDataMonthDetail = function(year,month) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.UserUrl + 'Run/Month/Detail/'+year+'/'+month,
      }).then(function(data) {
        Running.data.selectedMonth.list = data.data;
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    Running.getSpecificRuns = function(RunIds) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: ENV.UserUrl + 'Runs/Detail/Specific',
        data: {
          RunIDs: RunIds
        }
      }).then(function(data) {
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    Running.getRunDataAll = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.UserUrl + 'Runs',
      }).then(function(data) {
        Running.data.allRuns = data.data;
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    Running.updateAllFromSource = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.UserUrl + 'Run/Update/All',
      }).then(function(data) {
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    Running.updateDetailFromSource = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.UserUrl + 'Run/Update/All/Detail',
      }).then(function(data) {
        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    //Running.getSpecificRuns('toast');
    //Running.updateDetailFromSource();
    return Running;
  });
