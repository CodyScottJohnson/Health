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
    'angular.filter',
    //'angularMoment',
    'FBAngular',
    'angular.morris',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
  ]);
angular.module('Health').run(function($rootScope, $state, $cookies) {
});
angular.module('Health').config(function($urlMatcherFactoryProvider,$stateProvider, $urlRouterProvider) {

  $urlMatcherFactoryProvider.caseInsensitive(true);
  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('app', {
      url: '',
      abstract:true,
      templateUrl: 'views/index.html',
      controller: 'MainCtrl',
      data: {
        requireLogin: true
      }

    })
    .state('app.Dashboard', {
      url: '/',
      templateUrl: 'views/Pages/MainDashboard.html',
      controller:'DashboardCtrl'

    })
    .state('app.Running', {
      url: '/Running',
      templateUrl: 'views/Pages/Running/dashboard.html',
      controller:'RunningCtrl'

    })
    .state('app.Apply', {
      url: '/apply',
      templateUrl: 'views/Modals/applynow.html',
      controller: 'ApplicationCtrl',

    });

});
