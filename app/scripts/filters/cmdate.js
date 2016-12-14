'use strict';

/**
 * @ngdoc filter
 * @name JFS_Admin.filter:cmdate
 * @function
 * @description
 * # cmdate
 * Filter in the JFS_Admin.
 */
angular.module('Health')
  .filter('cmdate', [
    '$filter',
    function($filter) {
        return function(input, format) {
            if(input === null){return '';}
            else {return $filter('date')(new Date(input), format, 'UTC');}
        };
    }
])
.filter('pace', [
  '$filter',
  function($filter) {
      return function(input) {
        var min = Math.round((input-Math.floor(input))*60)
        return Math.floor(input) +"' " + min + '"';
      };
  }
]);
