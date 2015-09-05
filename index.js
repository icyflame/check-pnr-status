'use strict';
module.exports = function (str, opts) {
  var request = require('request');
  var chalk = require('chalk');
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var getAllPnrs = require('./getPnrs.js');
  var addPnr = require('./addPnr.js');
  var addApiKey = require('./addApiKey.js');

  var conf = new Configstore(pkg.name);

  var error = require('./tools.js').error;
  var info = require('./tools.js').info;
  var success = require('./tools.js').success;

  if (opts.a || opts.all || str) {
    if (!conf.get('API_KEY')) {
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
    console.log('Add this PNR to the configstore!');
    return;
  }

  if (opts.a || opts.all) {
    console.log('Need to check all PNRs!');
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
    console.log('Check the PNR: ' + str);
    return;
  }
};
