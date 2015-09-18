/* global it, describe */
'use strict';
var assert = require('assert');
// var tools = require('./tools.js');
// var async = require('async');
// var checkPnrStatus = require('./');

describe('test suite is running', function () {
  it('should work', function () {
    assert.strictEqual(true, true);
  });
});
/*
describe('check if PNR validation function in tools.js works', function () {
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
  });
});

describe('check if HTML parser in tools.js works', function () {
  var fs = require('fs');
  var simple = fs.readFileSync('./examples/simple_example.html').toString();
  var table = fs.readFileSync('./examples/table_example.html').toString();
  var confirmed = fs.readFileSync('./examples/confirmed.html').toString();

  var validateEachSelectorAndOutput = function (file_name) {
    return function (inObj, callback) {
      tools.getDataFromHtml(file_name, [inObj.sel], function (err, parsedData) { // eslint-disable-line
        assert.deepEqual(parsedData, [inObj.out]);
        callback();
      });
    };
  };

  it('should parse html properly (simple)', function () {
    var thisCaseSelectors = [
      {
        sel: 'p#text',
        out: 'sometexthere'
      },
      {
        sel: '#text',
        out: 'sometexthere'
      }
    ];

    async.each(thisCaseSelectors, validateEachSelectorAndOutput(simple));
  });

  it('should parse table html properly', function () {
    var thisCaseSelectors = [
      {
        'sel': 'table > tbody > tr:nth-child(1) > td:nth-child(1)',
        'out': '1-1'
      },
      {
        'sel': 'table > tbody > tr:nth-child(2) > td:nth-child(1)',
        'out': '2-1'
      },
      {
        'sel': 'body > table > tbody > tr:nth-child(1) > td:nth-child(1)',
        'out': '1-1'
      },
      {
        'sel': 'body > table > tbody > tr:nth-child(2) > td:nth-child(4)',
        'out': '2-4'
      }
    ];

    async.each(thisCaseSelectors, validateEachSelectorAndOutput(table));
  });

  it('should work with confirmed PNR page returned by IRCTC', function () {
    var selectors = require('./defineSelectors.js').selectors;
    var thisCaseSelectors = [
      {
        'sel': selectors[0],
        'out': '1-1'
      },
      {
        'sel': selectors[1],
        'out': '2-1'
      },
      {
        'sel': selectors[2],
        'out': '1-1'
      },
      {
        'sel': selectors[3],
        'out': '2-4'
      }
    ];

    for (var i = 0; i < thisCaseSelectors.length; i++) {
      var inObj = thisCaseSelectors[i];
      tools.getDataFromHtml(confirmed, [inObj.sel], function (err, parsedData) { // eslint-disable-line
        console.log(parsedData);
        console.log(inObj.out);
        assert.deepEqual(parsedData[0], inObj.out);
      });
    }
  });
});
*/
