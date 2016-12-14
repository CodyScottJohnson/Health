'use strict';

/**
 * @ngdoc filter
 * @name JFS_Admin.filter:highlight
 * @function
 * @description
 * # highlight
 * Filter in the JFS_Admin.
 */
angular.module('Health')
  .filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) {
        text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
          '<span class="highlighted">$1</span>');
      }
      return $sce.trustAsHtml(text);
    };
  });
