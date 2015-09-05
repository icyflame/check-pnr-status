module.exports = function (Pnr, cb) {
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
