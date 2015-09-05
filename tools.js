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
