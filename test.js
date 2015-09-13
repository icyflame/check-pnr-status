/* global it */
'use strict';
var assert = require('assert');
var tools = require('./tools.js');
// var checkPnrStatus = require('./');

it('should ', function () {
  assert.strictEqual(true, true);
});

it('should validate PNR ', function () {
  assert.strictEqual(tools.validatePnr('4111123456'), true);
  assert.throws(function () {
    tools.validatePnr('12345');
  });
  assert.throws(function () {
    tools.validatePnr('123456789456');
  });
  assert.throws(function () {
    tools.validatePnr('foo');
  });
  assert.throws(function () {
    tools.validatePnr('12foo45bar');
  });
  // assert.throws(tools.validatePnr('41245654654345'));
  // assert.throws(tools.validatePnr('foo'));
});
