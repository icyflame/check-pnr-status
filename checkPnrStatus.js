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

var getPnrStatusDirectSite = function (Pnr, cb) {
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
      cb(false);
    }
    console.log(response.statusCode);
    require('fs').writeFileSync('temp.html', body);
    cb(null);
  // }
  });
};

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

module.exports = getPnrStatusDirectSite;
