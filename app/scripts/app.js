'use strict';
//
/**
 * @ngdoc overview
 * @name jfsApp
 * @description
 * # jfsApp
 *
 * Main module of the application.
 */
angular
  .module('Health', [
    'config',
    'angular.filter',
    //'angularMoment',
    'FBAngular',
    'angular.morris',
    'LocalStorageModule',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
  ]);
angular.module('Health').run(function($rootScope, $state, $cookies, localStorageService, ENV) {
  $rootScope.rint = Math.floor(Math.random() * (17 - 1 + 1)) + 1;
  $rootScope.conn = new WebSocket('wss://jfsapp.com/WebSocket');
  $rootScope.conn.onopen = function(e) {
    console.log("Connection established!");
    $rootScope.conn.send(angular.toJson({
      id: 'User-' + $rootScope.rint,
      type: 'Health',
      'action': 'NewID'
    }));
  };
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if ($state.current.name != "login") {
        $rootScope.state = $state.current;
      }
      var requireLogin = toState.data.requireLogin;
      if (typeof $rootScope.currentUser === 'undefined') {
        $rootScope.currentUser = localStorageService.get('user');
        if(typeof $rootScope.currentUser !== 'undefined' && $rootScope.currentUser !== null){
        ENV.UserUrl = ENV.API + $rootScope.currentUser.User_ID + '/';
      }
      }
      if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
        event.preventDefault();
        $rootScope.LastLocation = location.href;
        $state.go('login');
      } else if (toState.name != 'login' && toState.name !== '' && ($rootScope.currentUser === null)) {
        event.preventDefault();
        $rootScope.LastLocation = location.href;
        $state.go('login');
      }
  });
});
angular.module('Health').config(function($locationProvider,$urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('Health');
  //$locationProvider.html5Mode(true);
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('login', {
      url: '/Login',
      templateUrl: 'views/Pages/Login.html',
      data: {
        requireLogin: false
      },
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'views/index.html',
      controller: 'MainCtrl',
      data: {
        requireLogin: true
      }

    })
    .state('app.Oauth', {
      url: '/Oauth/:site',
      templateUrl: 'views/Pages/Oauth.html',
      controller: 'OauthCtrl'

    })
    .state('app.Dashboard', {
      url: '/',
      templateUrl: 'views/Pages/MainDashboard.html',
      controller: 'DashboardCtrl'

    })
    .state('app.Running', {
      url: '/Running',
      templateUrl: 'views/Pages/Running/dashboard.html',
      controller: 'RunningCtrl'

    })
    .state('app.Apply', {
      url: '/apply',
      templateUrl: 'views/Modals/applynow.html',
      controller: 'ApplicationCtrl',

    });

});
