'use strict';

/**
 * @ngdoc service
 * @name Health.User
 * @description
 * # User
 * Factory in the Health.
 */
angular.module('Health')
  .factory('User', function(ENV, $rootScope, $http, $q, $state, localStorageService) {
    var User = {
      data: {}
    };
    User.Login = function(Username, Password) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: ENV.API + 'Login',
        params: {
          Username: Username,
          Password: Password
        }
      }).then(function(data) {
        $rootScope.currentUser = data.data;
        localStorageService.set('user', data.data);
        ENV.UserUrl = ENV.API + data.data.User_ID + '/';
        if (angular.isDefined($rootScope.LastLocation)) {
          var lastLocation = $rootScope.LastLocation;
          delete $rootScope.LastLocation;
          location.href = lastLocation;
        } else {
          $state.go('app.Dashboard');
        }

        deferred.resolve(data.data);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
    User.logout = function() {
      $rootScope.currentUser = null;
      localStorageService.clearAll();
      $rootScope.state = $state.current;
      $state.go('login');
    };
    User.UpdateLocal = function(User) {
      $rootScope.currentUser = User;
      localStorageService.set('user', User);
      ENV.UserUrl = ENV.API + User + '/';
    };
    return User;
  });
