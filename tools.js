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
