'use strict';

describe('module: main, service: HealthKit', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var HealthKit;
  beforeEach(inject(function (_HealthKit_) {
    HealthKit = _HealthKit_;
  }));

  it('should do something', function () {
    expect(!!HealthKit).toBe(true);
  });

});
