const inquirer = require('inquirer');
var questions = require('./questions')



inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});
