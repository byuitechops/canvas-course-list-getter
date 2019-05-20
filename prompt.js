const inquirer = require('inquirer');
const query_string = require('query-string')
const canvas = require('canvas-api-wrapper');
const questions = require('./questions')



inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    var newAnswers = [];
    newAnswers.push(answers);
    delete newAnswers.filters
    delete newAnswers.output
    
    const stringified = query_string.stringify(newAnswers);
    console.log("TACO" + answers)
    console.log(stringified) 
})