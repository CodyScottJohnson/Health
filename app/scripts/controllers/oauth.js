'use strict';

/**
 * @ngdoc function
 * @name Health.controller:OauthCtrl
 * @description
 * # OauthCtrl
 * Controller of the Health
 */
angular.module('Health')
  .controller('OauthCtrl', function ($scope, $stateParams, Functions, $http) {
    var Params = Functions.GetParams(window.location.search);
    if($stateParams.site == 'runkeeper'){
      $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    },
        url: 'https://runkeeper.com/apps/token',
        data:{grant_type:'authorization_code',client_id:'66896e2e56ed49569a6fcac5f73e94b2',client_secret:'0fd65db0b59c4cbc877bd443d821bcd6',redirect_uri:'http://localhost:9000/Oauth/runkeeper',code:Params.code}
      }).then(function(data) {
        console.log(data.data);
      }, function(error) {

      });
    }
  });
