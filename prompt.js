const inquirer = require('inquirer');
const query_string = require('query-string')
const canvas = require('canvas-api-wrapper');
const questions = require('./questions')
var fs = require('fs');
var d3 = require('d3-dsv')







var arrayFormat = {arrayFormat: 'bracket'}

inquirer.prompt(questions).then(async answers => {
    console.log(JSON.stringify(answers, null, '  '));
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n") 

    var newAnswers = [];
    newAnswers.push(answers);
    console.log(newAnswers)
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n")  

    delete answers.filters
    delete answers.Output
    //
    console.log(answers)
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n")  

    
    const stringified = query_string.stringify(answers, {arrayFormat: 'bracket'});
    console.log(stringified) 
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n") 

    const parse = query_string.parseUrl('https://byui.instructure.com/api/v1/accounts/1/courses?'+stringified);
    console.log(parse)



    
}).then(async stringified =>{
    const results = await canvas.get('/api/v1/accounts/1/courses?'+stringified)
    //console.log(results)

    var courses = JSON.stringify(results)



        fs.appendFile("courses.json", courses, function(err) {
            if (err) console.log(err);
                console.log('complete');
            }
          );



})