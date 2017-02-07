'use strict';

describe('module: main, controller: SyncCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var SyncCtrl;
  beforeEach(inject(function ($controller) {
    SyncCtrl = $controller('SyncCtrl');
  }));

  it('should do something', function () {
    expect(!!SyncCtrl).toBe(true);
  });

});
