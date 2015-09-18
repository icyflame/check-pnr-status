/*
var async = require('async');
function performRequest (Pnr, htmlParseCallback) {
  console.log('Performing request!');
  console.log((new Date()).toISOString());
  console.log(Pnr);

  var request = require('request');

  var requestUrl = 'http://www.indianrail.gov.in/cgi_bin/inet_pnstat_cgi_10521.cgi';

  var random_digit = parseInt(Math.random() * 89999, 10) + 10000;

  var formData_object = {
    'lccp_cap_val': random_digit,
    'lccp_capinp_val': random_digit,
    'lccp_pnrno1': Pnr,
    'submit': 'Get Status'
  };

  var header_object = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:19.0) Gecko/20100101 Firefox/19.0',
    'Host': 'www.indianrail.gov.in',
    'Origin': 'http://www.indianrail.gov.in',
    'Referer': 'http://www.indianrail.gov.in/pnr_Enq.html'
  };
  request({ method: 'POST', url: requestUrl, form: formData_object, headers: header_object }, function (error, response, body) {
    if (error) {
      console.error(error);
      htmlParseCallback(error);
    } else if (!error && response.statusCode === 200) {
      console.log('Request completed successfully!');
      console.log((new Date()).toISOString());
      console.log('sending body to html parser');
      htmlParseCallback(null, body);
    }
  });
}

function htmlParse (html_body, printCallback) {
  console.log('Parsing HTML!');
  console.log((new Date()).toISOString());
  var tools = require('./tools.js');
  tools.getDataFromHtml(html_body, require('./defineSelectors.js').selectors, function (err, retObj) { // eslint-disable-line
    require('fs').writeFileSync('temp.html', html_body);
    var resultObj = {
      'from': retObj[0],
      'to': retObj[1],
      'date': retObj[2],
      'status': retObj[3]
    };
    console.log('HTML Parsed!');
    console.log((new Date()).toISOString());
    console.log(retObj.length);
    printCallback(null, resultObj);
  });
}

htmlParse(require('fs').readFileSync('./temp-all.html'), function (err, result) {
  console.log(require('util').inspect(result, { depth: null }));
});

var requestAndParseHtml = async.compose(htmlParse, performRequest);

requestAndParseHtml('4111772317', function (err, result) {

  // var objToTable = require('obj-to-table');
  console.log('Completed! :D');
  console.log(require('util').inspect(result, { depth: null }));
  // console.log(require('util').inspect(result, { depth: null }));
});

*/

var fs = require('fs');
var tools = require('./tools.js');

var full_body = fs.readFileSync('./temp-all.html').toString();

full_body.replace(/\<HTML\>/g, '')
full_body.replace(/\<\/HTML\>/g, '')
full_body = '<html>' + full_body + '</html>';

tools.getDataFromHtml(full_body, require('./defineSelectors').selectors, function (err, parsedData) { // eslint-disable-line
  console.log(parsedData);
});

/*

var y = full_body.split('<HTML>');

for (var i = 0; i < y.length; i++) {
  fs.writeFileSync('temp' + i + '.html', y[i]);
}
var tools = require('./tools.js');
var async = require('async');
async.eachSeries(y, function iterator (item, callback) {
  if (item.length < 100) {
    callback();
  } else {
    tools.getDataFromHtml(item, require('./defineSelectors').selectors, function (err, parsedData) { // eslint-disable-line
      console.log(parsedData);
      callback();
    });
  }
}, function done (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Completed! :D');
  }
});
*/
