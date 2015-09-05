module.exports = function (OnePnr) {
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var conf = new Configstore(pkg.name);

  if (conf.get('PNR_ARRAY')) {
    conf.set('PNR_ARRAY', conf.get('PNR_ARRAY') + ',' + OnePnr);
  } else {
    conf.set('PNR_ARRAY', OnePnr);
  }
  return;
};
