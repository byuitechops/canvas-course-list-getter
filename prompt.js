const inquirer = require('inquirer');
const canvas = require('canvas-api-wrapper');


var queryString = '';

var questions = [{
        type: 'checkbox',
        name: 'filters',
        message: 'What would you like to search for in courses?',
        choices: [{
                name: 'Enrollments'
            },
            {
                name: 'Published'
            },
            {
                name: 'Blueprint'
            },
            {
                name: 'Teachers'
            },
            {
                name: 'Sub Accounts'
            },
            {
                name: 'State'
            },
            {
                name: 'Include'
            },
            {
                name: 'Sort'
            },
            {
                name: 'Order'
            },
            {
                name: 'Search By'
            }
        ]
    },
    {
        type: 'list',
        name: 'enrollments',
        message: 'Do you want to only receive courses with at least one enrollment?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Enrollments');
        },
        filter: function (answer) {
            if (answer === 'Yes') {
                queryString += '&with_enrollments=true'
            } else {
                queryString += '&with_enrollments=false'
            }
            return answer;
        }
    },
    {
        type: 'checkbox',
        name: 'enrollment_type',
        message: 'Do you want to only have courses that have at least one person enrolled with this specific user role type?',
        choices: ['teacher', 'student', 'ta', 'observer', 'designer'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Enrollments');
        },
        filter: function (answer) {
            queryString += '&enrollment_type' + answer;
            return answer;
        }
    },
    {
        type: 'list',
        name: 'published_status',
        message: 'Do you want to filter on published status?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Published');
        },
        filter: function (answer) {
            if (answer === 'Yes') {
                queryString += '&published=true'

            } else {
                queryString += '&published=false'
            }
            return answer;
        }
    },
    {
        type: 'list',
        name: 'completion_status',
        message: 'Do you want to filter on course completion status?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Published');
        },
        filter: function (answer) {
            if (answer === 'Yes') {
                queryString += '&completed=true'
            } else {
                queryString += '&completed=false'
            }
            return answer;
        }
    },
    {
        type: 'list',
        name: 'blueprint',
        message: 'Do you want to filter on blueprint courses?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Blueprint');
        },
        filter: function (answer) {
            if (answer === 'Yes') {
                queryString += '&blueprint=true'
            } else {
                queryString += '&blueprint=false'
            }
            return answer;
        }
    },
    {
        type: 'list',
        name: 'blueprint_associated',
        message: 'Do you want to filter on courses associated with a blueprint course?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Blueprint');
        },
        filter: function (answer) {
            if (answer === 'Yes') {
                queryString += '&blueprint_associated=true'
            } else {
                queryString += '&blueprint_associated=false'
            }
            return answer;
        }
    },
    {
        type: 'list',
        name: 'teacher',
        message: 'Do you want to filter by courses taught by specific teachers?',
        choices: ['WORK WITH AARON ON INPUT TYPE', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Teachers');
        }
    },
    {
        type: 'list',
        name: 'sub_accounts',
        message: 'Do you want to filter by courses within sub accounts?',
        choices: ['WORK WITH AARON ON INPUT TYPE', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Sub Accounts');
        }
    },
    {
        type: 'list',
        name: 'state',
        message: 'Which course state do you want to filter on?',
        choices: ['Created', 'Claimed', 'Available', 'Completed', 'Deleted', 'All'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'State');
        },
        filter: function(answer){
            queryString += `&state[]=${answer}`
            return answer
        }
    },
    {
        type: 'list',
        name: 'term_id_q',
        message: 'Would you like to filter by enrollment term id?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Include');
        }
    },
    {
        type: 'input',
        name: 'term_id',
        message: 'Okay. What is the term ID?',
        when: function(answers){
            return answers.term_id_q === 'Yes'
        }, 
        filter: function(answer){
            queryString += `&enrollment_term_id=${answer}`
            return answer;
        }
    },
    {
        type: 'list',
        name: 'search_term_q',
        message: 'Do you want to include a search term?',
        choices: ['Yes', 'No'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Include')
        }
    },
    {
        type: 'input',
        name: 'search_term',
        message: "Okay, what is your search term?",
        when: function (answers) {
            return answers.search_term_q === 'Yes';
        },
        filter: function(answer){
            queryString += `&search_term=${answer}`
            return answer;
        }
    },
    {
        type: 'list',
        name: 'information',
        message: 'What information would you like to include with your course data?',
        choices: ['Syllabus Body', 'Term', 'Course Progress', 'Storage', 'Total Students', 'Teachers', 'Account Name',
            'Concluded'
        ],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Include')
        },
        filter: function(answer){

            queryString += `&include[]=${answer.toLowerCase().replace(' ','_')}`
            return answer;
        }
    },
    {
        type: 'list',
        name: 'sort',
        message: 'How would you like to sort the results column by?',
        choices: ['Course Name', 'SIS ID', 'Teacher', 'Account Name'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Sort')
        },
        filter: function(answer){

            queryString += `&sort=${answer.toLowerCase().replace(' ','_')}`
            return answer;
        }
    },
    {
        type: 'list',
        name: 'order',
        message: 'Do you want the order to be Ascending or Descending?',
        choices: ['Ascending', 'Descending'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Order')
        }, 
        filter: function(answer){
            if (answer === 'Ascending'){
                queryString += '&order=asc'
            } else if (answer === 'Descending'){
                queryString += '&order=desc'
            }
            
            return answer;
        }
    },
    {
        type: 'list',
        name: 'search_by',
        choices: ['Course', 'Teacher'],
        when: function (answers) {
            return answers.filters.find(ans => ans === 'Search By')
        }, 
        filter: function(answer){
            queryString += `&search_by=${answer.toLowerCase()}`
            return answer;
        }
    },
    {
        type: 'list',
        name: 'Output',
        message: 'How would you like to output this data?',
        choices: ['Node Module', 'CSV', 'JSON', 'Console']
    }

];

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    return answers
}).then(async answers => {
    console.log(queryString)
    const results = await canvas.get('/api/v1/accounts/1/courses?'+queryString)
    console.log(results)
});