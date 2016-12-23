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
    'angular.morris',
    'FBAngular',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'uiSwitch'
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
    .state('app.Running', {
      url: '/',
      templateUrl: 'views/Pages/Running/dashboard.html',

    })
    .state('app.Apply', {
      url: '/apply',
      templateUrl: 'views/Modals/applynow.html',
      controller: 'ApplicationCtrl',

    });

});
