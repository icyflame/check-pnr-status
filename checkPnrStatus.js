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
    cb({
      'from': bodyJson.from_station.code,
      'to': bodyJson.to_station.code,
      'status': bodyJson.passengers[0].current_status
    });
  }
  );
};
