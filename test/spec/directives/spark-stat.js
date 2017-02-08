'use strict';

describe('Directive: sparkStat', function () {

  // load the directive's module
  beforeEach(module('Health'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spark-stat></spark-stat>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sparkStat directive');
  }));
});
