'use strict';

describe('Service: Running', function () {

  // load the service's module
  beforeEach(module('Health'));

  // instantiate service
  var Running;
  beforeEach(inject(function (_Running_) {
    Running = _Running_;
  }));

  it('should do something', function () {
    expect(!!Running).toBe(true);
  });

});
