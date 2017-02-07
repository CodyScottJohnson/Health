'use strict';

describe('module: main, controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var DashboardCtrl;
  beforeEach(inject(function ($controller) {
    DashboardCtrl = $controller('DashboardCtrl');
  }));

  it('should do something', function () {
    expect(!!DashboardCtrl).toBe(true);
  });

});
