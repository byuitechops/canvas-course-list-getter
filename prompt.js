const inquirer = require('inquirer');
const query_string = require('query-string')
const questions = require('./questions')
const canvas = require('canvas-api-wrapper');
var fs = require('fs');
var d3 = require('d3-dsv')

/************************************************************************
 * @author Cameron Thompson
 * 
 * This function calls the inquirer prompt function with the question
 * object being passed in. This function will take the answers from 
 * the questions and will take off the filters and output options so 
 * those don't get turned into a query. This function will make a query
 * string based on the questions and will call the makeAPICall() function
 * with the query string then will take those results and pass them into
 * the makeOutput() function to generate the output specified by the user. 
 * 
 **************************************************************************/
async function promptUser() {
    return await inquirer.prompt(questions.questionsArray).then(async answers => {

        if(!questions.defaultAns === undefined){
            answers = Object.assign(questions.defaultAns, answers)
        } 

        var newAnswers = [];
        var output = answers.Output;
        newAnswers.push(answers);


        // Deleting these so they don't go into the query string
        delete answers.filters
        delete answers.Output


        // MAKE THE QUERY STRING!
        var stringifiedQuery = makeQuery(answers)  
        console.log(`Getting your results in ${output} format! This should take a moment.`)

        const results = await makeAPICall(stringifiedQuery)
        // Generate the output based on the users selection
        makeOutput(output, results)

        return results

    }).catch(console.log)
}

/**
 * 
 * @author Cameron Thompson
 * @param {JSON} answers The JSON answers object
 *
 * 
 */
function makeQuery(answers){
    var stringifiedQuery = query_string.stringify(answers, {
        arrayFormat: 'bracket' // This is for the brackets of the query string
    });

    return stringifiedQuery;
}


/************************************************************************
 * Makes an api call to Canvas with the query string passed in
 * 
 * @author Cameron Thompson
 * @param {string} stringifiedQuery Make sure this is a string of a query
 * @returns {Array} An array of course JSON objects
 **************************************************************************/
async function makeAPICall(stringifiedQuery) {
    // Used for debugging shenanigans 
    //console.log("+++++++++++++++++++++++++++++"+stringifiedQuery)
    var courses = await canvas.get('/api/v1/accounts/1/courses?' + stringifiedQuery)

    return courses
}

/*************************************************************************
 * 
 * @author Cameron Thompson
 * @param {string} output A string from the answer set by the user
 * @param {Array} results An array of course JSON objects
 * 
 * @returns If the output is 'Node Module', then it will return the 
 * results. If no output was set, this function will return the results
 * passed in. Otherwise, this function will return nothing. 
 * 
 **************************************************************************/
function makeOutput(output, results) {
    if (output === 'Node Module') {
        console.log("Complete \\\(ˆ˚ˆ)/")
        return results;

    } else if (output === 'CSV') {
        if (results === '[]'){
            console.log("NO COURSES FOR SELECTED FILTERS")
        }
        else{
            var courses = d3.csvFormat(results)
            fs.writeFile("./courses.csv", courses, function (err) {
                if (err) console.log(err);
                console.log('Complete \\\(ˆ˚ˆ)/');
            });
        }
    } else if (output === 'JSON') {

        var courses = JSON.stringify(results)
        fs.writeFile("./courses.json", courses, function (err) {
            if (err) console.log(err);
            console.log('Complete \\\(ˆ˚ˆ)/');
        });

    } else if (output === 'Console') {
        console.log('Complete \\\(ˆ˚ˆ)/');
        console.log(results)
    } 
        
    return results;


}

module.exports = promptUser