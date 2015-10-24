function performRequest (Pnr, htmlParseCallback, verboseOutput) {
  if (verboseOutput) {
    console.log('Processing PNR ' + Pnr);
    console.log('Performing request!');
    console.log((new Date()).toISOString());
    console.log(Pnr);
  }
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

	var flushed_pnrs = [];
  request({ method: 'POST', url: requestUrl, form: formData_object, headers: header_object }, function (error, response, body) {
    if (error) {
      console.error(error);
      htmlParseCallback(error);
    } else if (!error && response.statusCode === 200) {
      if (verboseOutput) {
        console.log('Recd ' + body.length + ' bytes from server.');
        console.log('Request completed successfully!');
        console.log((new Date()).toISOString());
        console.log('sending body to html parser');
      }
			if (body.match(/FLUSHED\sPNR/g)) {
				flushed_pnrs.push(Pnr);
			}
      htmlParseCallback(null, body, flushed_pnrs);
    }
  });
}

module.exports.performRequest = performRequest;
