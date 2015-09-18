#!/usr/bin/env node
'use strict';
var meow = require('meow');
var checkPnrStatus = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ pnr [input]',
    '',
    'Examples',
    '  $ pnr',
    '  All PNR statuses retrieved!',
    '  Parsing the recieved data.',
    '',
    ' ┌───────────────┬───────────────┬───────────────┬───────────────┐',
    ' │ from          │ to            │ date          │ status        │',
    ' ├───────────────┼───────────────┼───────────────┼───────────────┤',
    ' │ KGP           │ MAS           │ 29-11-2015    │ CNF           │',
    ' ├───────────────┼───────────────┼───────────────┼───────────────┤',
    ' │ SRC           │ MAS           │ 16-10-2015    │ Confirmed     │',
    ' ├───────────────┼───────────────┼───────────────┼───────────────┤',
    ' │ MAS           │ KGP           │ 2-1-2016      │ W/L1          │',
    ' ├───────────────┼───────────────┼───────────────┼───────────────┤',
    ' │ KGP           │ SC            │ 17-10-2015    │ W/L71         │',
    ' └───────────────┴───────────────┴───────────────┴───────────────┘',
    '',
    '  $ pnr --add 1234567890',
    '',
    '  PNR added! Run pnr -a to check status of all PNRs!',
    '',
    'Options',
    '  --add          Add a PNR',
    '  --delete, -d   Delete a PNR',
    '  --all, -a      Show statuses of all the PNRs stored on machine',
    ''
  ]
});

checkPnrStatus(cli.input[0], cli.flags);
