module.exports = function (cb) {
  var async = require('async');
  var allPnrs = require('./getPnrs.js')();
  var checkPnrStatus = require('./checkPnrStatus.js');
  var logUpdate = require('log-update');
  var chalk = require('chalk');

  var GLOB_ARR = [];
  var this_pnr = '';
  var num = 0;
  var total = allPnrs.length;
  var i = 0;
  var frames = ['-', '\\', '|', '/'];

  var spinner = setInterval(function () {
    var frame = frames[i++ % frames.length];
    logUpdate('\n' + frame + chalk.green(' Processing PNR ' +
        this_pnr + '( ' + num + ' of ' + total + ')') + '\n');
  }, 100);

  async.eachSeries(allPnrs, function iterator (item, callback) {
    this_pnr = item;
    num += 1;
    checkPnrStatus(item, function (resultObj) {
      GLOB_ARR.push(resultObj);
      callback();
    });
  }, function done (err) {
    if (err) {
      console.error(err);
    } else {
      clearInterval(spinner);
      logUpdate(chalk.green('\nAll PNR statuses retrieved!'));
      cb(GLOB_ARR);
    }
  });
};
