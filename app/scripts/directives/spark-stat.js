'use strict';

/**
 * @ngdoc directive
 * @name Health.directive:sparkStat
 * @description
 * # sparkStat
 */
angular.module('Health')
  .directive('sparkStat', function () {
    return {
      templateUrl: 'views/Directives/spark_stat.html',
      restrict: 'E',
      scope:{
        statName:'=',
        statIcon:'=',
        statColor:'=',
        statSelected:'=',
        statMetric:'=',
        statValue:'=',
        statData:'=',
        statRedraw:'=',
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the sparkStat directive');
      }
    };
  });
