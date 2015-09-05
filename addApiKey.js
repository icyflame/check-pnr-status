module.exports = function (ApiKey, cb) {
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var conf = new Configstore(pkg.name);
  var inquirer = require('inquirer');

  if (conf.get('API_KEY')) {
    var questionsObj = [{
      'type': 'confirm',
      'name': 'ApiKeyOverwriteConfirmation',
      'message': 'Are you sure you want to delete the exisint API key?'
    }];
    inquirer.prompt(questionsObj, function (answers) {
      if (answers.ApiKeyOverwriteConfirmation) {
        conf.set('API_KEY', ApiKey);
        cb('written');
      } else {
        cb('unchanged');
      }
    });
  } else {
    conf.set('API_KEY', ApiKey);
  }
};
