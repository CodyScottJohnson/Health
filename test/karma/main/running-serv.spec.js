'use strict';

describe('module: main, service: Running', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Running;
  beforeEach(inject(function (_Running_) {
    Running = _Running_;
  }));

  it('should do something', function () {
    expect(!!Running).toBe(true);
  });

});
