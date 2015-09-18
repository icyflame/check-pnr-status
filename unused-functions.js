function htmlParse (html_body, printCallback) {
  console.log('Parsing HTML!');
  console.log((new Date()).toISOString());
  console.log(html_body.length);
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

var requestAndParseHtml = async.compose(htmlParse, performRequest); // eslint-disable-line

var getPnrStatusRailwayApi = function (Pnr, cb) { // eslint-disable-line
  var request = require('request');
  var getApiKey = require('./tools.js').getApiKey;

  var requestUrl = 'http://api.railwayapi.com/pnr_status/pnr/' + Pnr +
    '/apikey/' + getApiKey() + '/';

  request({ method: 'GET', uri: requestUrl, gzip: true }, function (error, response, body) {
    if (error) {
      console.error(error);
      cb(false);
    }
    var bodyJson = JSON.parse(body);
    if (bodyJson.error === 'Quota exhausted for day') {
      throw new Error('Quota exceeded! Try again tomorrow morning at 5:30 am.');
    } else if (response.statusCode === 200) {
      console.log(require('util').inspect(bodyJson, { depth: null }));
      var resultObj = {
        'from': bodyJson.from_station.code,
        'to': bodyJson.to_station.code,
        'date': (new Date(bodyJson.train_start_date.year,
          bodyJson.train_start_date.month - 1,
          bodyJson.train_start_date.day))
          .toDateString(),
        'status': bodyJson.passengers[0].current_status
      };
      cb(resultObj);
    }
  });
};

function getCorrectUrl () { // eslint-disable-line
  var async = require('async');
  var request = require('request');
  var cheerio = require('cheerio');

  var url = 'http://www.indianrail.gov.in/pnr_Enq.html';
  async.series([
    function (callback) {
      request(url, function (err, response, body) {
        console.log('Request returned :D');
        if (!err && response.statusCode === 200) {
          var $ = cheerio.load(body);
          var final_url = $('form').attr('action');
          console.log(final_url);
          callback(null, final_url);
        } else {
          if (err) {
            callback(err);
          }
        }
      });
    }], function (err, results) {
    if (err) {
      console.error(err);
    }
    return results[0];
  });
}

module.exports.getDataFromHtmlSingleMatch = function (html_body, selectors, callback) {
  var retObj = selectors;
  var fs = require('fs');
  var jquery = fs.readFileSync('./libs/jquery.js', 'utf-8');
  var jsdom = require('jsdom');
  jsdom.env({
    html: html_body,
    src: [jquery],
    done: function (err, window) { // eslint-disable-line
      var $ = window.$;
      for (var i = 0; i < selectors.length; i++) {
        retObj[i] = (removeExtraSpaces($(selectors[i]).text()).toString());
      }
      // console.log(retObj);
      window.close();
      callback(null, retObj);
    }
  });
};
