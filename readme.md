# check-pnr-status

> My divine module

[![Build Status](https://travis-ci.org/icyflame/check-pnr-status.svg?branch=master)](https://travis-ci.org/icyflame/check-pnr-status)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Install

```
$ npm install --save check-pnr-status
```


## Usage

```js
var checkPnrStatus = require('check-pnr-status');

checkPnrStatus('unicorns');
//=> unicorns & rainbows
```


## CLI

```
$ npm install --global check-pnr-status
```
```
$ check-pnr-status --help

  Usage
    check-pnr-status [input]

  Example
    check-pnr-status
    unicorns & rainbows

    check-pnr-status ponies
    ponies & rainbows

  Options
    --foo  Lorem ipsum. Default: false
```


## API

### checkPnrStatus(input, [options])

#### input

*Required*  
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Siddharth Kannan](http://icyflame.github.io)
