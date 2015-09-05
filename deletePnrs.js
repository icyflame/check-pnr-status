module.exports = function (cb) {
  var inquirer = require('inquirer');
  var allPnrs = require('./getPnrs.js')();
  var arrExclude = require('arr-exclude');
  var Configstore = require('configstore');
  var pkg = require('./package.json');
  var conf = new Configstore(pkg.name);

  var choiceArr = [];

  allPnrs.forEach(function (element, index, array) {
    choiceArr.push({
      name: element,
      checked: false
    });
  });

  var questionsObj = [{
    'type': 'checkbox',
    'name': 'pnrsToDelete',
    'message': 'Which PNRs do you want to delete?',
    'choices': choiceArr
  }];

  inquirer.prompt(questionsObj, function (answers) {
    var newPnrArray = arrExclude(allPnrs, answers.pnrsToDelete);
    conf.set('PNR_ARRAY', newPnrArray.join(','));
  });
};
