'use strict';

/**
 * @ngdoc function
 * @name Health.controller:OauthCtrl
 * @description
 * # OauthCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('OauthCtrl', function ($scope, $rootScope, $stateParams, Functions, User, $http, ENV,$location ) {
    var Params = Functions.GetParams(window.location.search);
    _.extend(Params,$location.search())
    var obj = {};
    if($stateParams.site == 'runkeeper'){
      obj = {grant_type:'authorization_code',
                 client_id:'66896e2e56ed49569a6fcac5f73e94b2',
                 redirect_uri:ENV.Runkeeper.redirect_uri,
                 code:Params.code};
      $http({
        method: 'POST',
        url: ENV.UserUrl + 'runkeepertoken',
        data:{params:obj}
      }).then(function(data) {
        console.log(data.data);
        User.UpdateLocal(data.data);
      }, function(error) {

      });
    }
    if($stateParams.site == 'strava'){
      obj = {
                 client_id:'16192',
                 code:Params.code};
        console.log(obj);
      $http({
        method: 'POST',
        url: ENV.UserUrl + 'stravatoken',
        data:{params:obj}
      }).then(function(data) {
        console.log(data.data);
        User.UpdateLocal(data.data);
      }, function(error) {

      });
    }
    $scope.SyncRunkeeper = function(){
      console.log('here');
      var url = "https://runkeeper.com/apps/authorize?client_id=66896e2e56ed49569a6fcac5f73e94b2&response_type=code&redirect_uri=";
      location.href =url + encodeURIComponent(ENV.Runkeeper.redirect_uri);
    };
    $scope.SyncAccount = function(account){
      var url = '';
      if(account == 'strava'){
      url = 'https://www.strava.com/oauth/authorize?client_id=16192&response_type=code&scope=view_private,write&redirect_uri=';
      url =url + encodeURIComponent(ENV.Strava.redirect_uri) + '&approval_prompt=force';
      }
      location.href = url;
    };
  });
