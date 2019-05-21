const inquirer = require('inquirer');
const query_string = require('query-string')
const canvas = require('canvas-api-wrapper');
const questions = require('./questions')
var fs = require('fs');
var d3 = require('d3-dsv')

var arrayFormat = {arrayFormat: 'bracket'}

inquirer.prompt(questions).then(async answers => {
/*     console.log(JSON.stringify(answers, null, '  '));
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n") 
 */
    var newAnswers = [];
    var output = answers.Output;
    newAnswers.push(answers);
 /*    console.log(newAnswers)
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n")   */

    delete answers.filters
    delete answers.Output
    //
/*     console.log(answers)
    console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n")   */

    
    var stringified = query_string.stringify(answers, {arrayFormat: 'bracket'});
     console.log(stringified) 
    /*console.log(
        "\n"+
        "       __|__\n"+
        "--@--@--(_)--@--@--\n") 

    const parse = query_string.parseUrl('https://byui.instructure.com/api/v1/accounts/1/courses?'+stringified);
    console.log(parse) */

    console.log(output)



    const results = await canvas.get('/api/v1/accounts/1/courses?'+ stringified)
    
    if (output === 'Node Module'){

    } else if (output === 'CSV') {
        var courses = d3.csvFormat(results)
        fs.writeFile("./courses.csv", courses, function(err) {
            if (err) console.log(err);
                console.log('complete :D');
            }
          );
    } else if (output === 'JSON') {

        var courses = JSON.stringify(results)
        fs.writeFile("./courses.json", courses, function(err) {
            if (err) console.log(err);
                console.log('complete :D');
            }
          );

    } else if (output === 'Console') {
        console.log(results)
    }

    
}).catch(console.log)