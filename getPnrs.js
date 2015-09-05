module.exports = function () {
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var conf = new Configstore(pkg.name);

  return conf.get('PNR_ARRAY').split(',');
};
