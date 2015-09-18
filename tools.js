module.exports.error = function (stringToPrint) {
  var chalk = require('chalk');
  console.log(['',
    chalk.red(stringToPrint),
    ''].join('\n'));
  return;
};

module.exports.success = function (stringToPrint) {
  var chalk = require('chalk');
  console.log(['',
    chalk.green(stringToPrint),
    ''].join('\n'));
  return;
};

module.exports.info = function (stringToPrint) {
  var chalk = require('chalk');
  console.log(['',
    chalk.blue(stringToPrint),
    ''].join('\n'));
  return;
};

module.exports.getApiKey = function () {
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var conf = new Configstore(pkg.name);
  return conf.get('API_KEY');
};

module.exports.showSpinner = function () {
  var logUpdate = require('log-update');
  var chalk = require('chalk');

  var i = 0;
  var frames = ['-', '\\', '|', '/'];

  return setInterval(function () {
    var frame = frames[i++ % frames.length];
    logUpdate('\n' + frame + chalk.green(' Processing your request') + '\n');
  }, 100);
};

module.exports.validatePnr = function (pnr) {
  var inArray = require('in-array');
  if (pnr.length !== 10) {
    throw new Error('Invalid PNR');
  }
  var numbers = [];
  for (var i = 0; i < 10; i++) {
    numbers.push(i.toString());
  }
  for (i = 0; i < pnr.length; i++) {
    if (!inArray(numbers, pnr[i])) {
      throw new Error('Invalid PNR');
    }
  }
  return true;
};

var removeExtraSpaces = module.exports.removeExtraSpaces = function (string) {
  return string.replace(/\s+/g, '');
};

module.exports.getDataFromHtml = function (html_body, selectors, callback) {
  var retObj = new Array(selectors.length);
  var fs = require('fs');
  var jquery = fs.readFileSync('./libs/jquery.js', 'utf-8');
  var jsdom = require('jsdom');
  jsdom.env({
    html: html_body,
    src: [jquery],
    done: function (err, window) { // eslint-disable-line
      var $ = window.$;
      for (var i = 0; i < selectors.length; i++) {
        var thisSelector = [];
        $(selectors[i]).each(function () {
          // console.log($(this).html());
          thisSelector.push(removeExtraSpaces($(this).text()).toString());
        });
        // console.log(thisSelector);
        retObj[i] = thisSelector;
      }
      window.close();
      callback(null, retObj);
    }
  });
};

module.exports.fixFormatting = function (resultObj) {
  /*
  Takes an array of arrays, and converts it into an Object
  that can be rendered by the obj-to-table module
  */
  var selectors = resultObj.length;
  if (selectors < 1) {
    return {};
  }
  var records = resultObj[0].length;
  var tableHeaders = require('./defineSelectors.js').tableHeaders;
  var tableObj = [];
  for (var i = 0; i < records; i++) {
    var thisRecord = {};
    for (var j = 0; j < tableHeaders.length; j++) {
      thisRecord[tableHeaders[j]] = resultObj[j][i];
    }
    tableObj.push(thisRecord);
  }
  return tableObj;
};
