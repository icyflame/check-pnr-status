module.exports = function (cb) {
  var async = require('async');
  var allPnrs = require('./getPnrs.js')();
  var tools = require('./tools.js');
  var fs = require('fs');
  var performRequest = require('./checkPnrStatus.js').performRequest;
  var logUpdate = require('log-update');
  var chalk = require('chalk');

  var this_pnr = '';
  var all_html = '';
  var num = 0;
  var total = allPnrs.length;
  var i = 0;
  var frames = ['-', '\\', '|', '/'];

  var spinner = setInterval(function () {
    var frame = frames[i++ % frames.length];
    logUpdate('\n' + frame + chalk.green(' Processing PNR ' +
        this_pnr + '( ' + num + ' of ' + total + ')') + '\n');
  }, 100);

	var delete_pnrs = [];

  async.eachSeries(allPnrs, function iterator (item, callback) {
    this_pnr = item;
    num += 1;
    performRequest(item, function (err, html_body, flushed_pnrs) { // eslint-disable-line
      all_html += html_body;
			if(flushed_pnrs && flushed_pnrs.length > 0) {
				delete_pnrs.push(flushed_pnrs[0]);
			}
      callback();
    });
  }, function done (err) {
    if (err) {
      console.error(err);
    } else {
      logUpdate(chalk.green('\nAll PNR statuses retrieved!\nParsing the recieved data'));
      fs.writeFileSync('./temp-all.html', all_html);
      tools.getDataFromHtml(all_html, require('./defineSelectors.js').selectors, function (err, resultObj) { // eslint-disable-line
        clearInterval(spinner);
        cb(tools.fixFormatting(resultObj), delete_pnrs);
      });
    }
  });
};
