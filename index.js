'use strict';
module.exports = function (str, opts) {
  var chalk = require('chalk');
  var Configstore = require('configstore');
  var logUpdate = require('log-update');
  var objToTable = require('obj-to-table');
  var pkg = require('./package.json');

  var deletePnrs = require('./deletePnrs.js');
  var addPnr = require('./addPnr.js');
  var checkPnrStatus = require('./checkPnrStatus.js');
  var addApiKey = require('./addApiKey.js');

  var conf = new Configstore(pkg.name);

  var error = require('./tools.js').error;
  var info = require('./tools.js').info;
  var success = require('./tools.js').success;
  var getApiKey = require('./tools.js').getApiKey;
  var showSpinner = require('./tools.js').showSpinner;

  if (opts.a || opts.all || str) {
    if (!getApiKey()) {
      error('Please get an API key from railwayapi.com');
      info('Then, run ' + chalk.green.underline('pnr --api-key abcdefgh'));
      return;
    }
  }

  if (opts.a || opts.all) {
    if (!conf.get('PNR_ARRAY')) {
      error('No PNR found!');
      info('Add a PNR using ' + chalk.green.underline('pnr --add 123456789'));
      return;
    }
  }

  if (opts.add) {
    addPnr(opts.add);
    success('PNR added! Run ' + chalk.green.underline('pnr -a') + ' to check status of all PNRs!');
    return;
  }

  if (opts.d || opts.del || opts.delete || str === 'delete') {
    deletePnrs();
    return;
  }

  if (opts.apiKey) {
    if (opts.apiKey === 'show' || typeof opts.apiKey === 'boolean') {
      info('The existing API key is ' + chalk.green.underline(conf.get('API_KEY')));
    } else if (typeof opts.apiKey === 'string') {
      addApiKey(opts.apiKey, function (result) {
        if (result === 'written') {
          success('API key added to the configstore.');
        } else if (result === 'unchanged') {
          success('API key was not changed.');
        }
      });
    } else {
      error('Invalid Option.');
      info('You can either show exisiting API key or add an API key.');
    }
    return;
  }

  if (str) {
    var spinner = showSpinner();

    checkPnrStatus(str, function (result) {
      clearInterval(spinner);
      logUpdate(chalk.green('\nPNR Status retrieved!'));
      console.log(objToTable(result).toString());
    });
    return;
  }

  // Default case

  require('./checkAllPnrStatus.js')(function (resultsObj, pnrs_to_delete) {
    console.log(objToTable(resultsObj).toString());
		console.log('\nYou have stored some PNRs which have been flushed by IRCTC: \n');
		for(var i = 0; i < pnrs_to_delete.length; i++) {
			console.log(i+1 + ': ' +  pnrs_to_delete[i]);
		}
		console.log('\nRun ' + chalk.green('pnr --delete') + ' and select this PNR to delete it from local store.\n');
  });
};
