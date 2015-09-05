#!/usr/bin/env node
'use strict';
var meow = require('meow');
var checkPnrStatus = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ check-pnr-status [input]',
    '',
    'Examples',
    '  $ check-pnr-status',
    '  unicorns & rainbows',
    '',
    '  $ check-pnr-status ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false'
  ]
});

console.log(checkPnrStatus(cli.input[0] || 'unicorns'));
