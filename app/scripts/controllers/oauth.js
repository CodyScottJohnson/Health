'use strict';

/**
 * @ngdoc function
 * @name Health.controller:OauthCtrl
 * @description
 * # OauthCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('OauthCtrl', function ($scope, $rootScope, $stateParams, Functions, User, $http, ENV ) {
    var Params = Functions.GetParams(window.location.search);
    if($stateParams.site == 'runkeeper'){
      var obj = {grant_type:'authorization_code',
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
    $scope.SyncRunkeeper = function(){
      console.log('here');
      var url = "https://runkeeper.com/apps/authorize?client_id=66896e2e56ed49569a6fcac5f73e94b2&response_type=code&redirect_uri=";
      location.href =url + encodeURIComponent(ENV.Runkeeper.redirect_uri);
    };
  });
