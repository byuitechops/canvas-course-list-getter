var inquirer = require('inquirer')

var questions = [
    {
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


function getFilters(choices){

    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'Select Filters',
          name: 'filters',
          choices: choices,
          validate: function(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one Filter.';
            }
    
            return true;
          }
        }
      ])
      .then(answers => {
        //console.log(JSON.stringify(answers));
        nextQuestions(answers);
    
      });
}



getFilters(questions)


function nextQuestions(ans){

    ans.filters.map(){
        return 1;
    }
    console.log(ans)
}


var masterQuestions =   {
    Enrollments: ['Do you want to only receive courses with at least one enrollment?', 'Do you want to only have courses that have at least one person enrolled with this specific user role type?'],
 
    Published: ['Do you want to filter on published status?', 'Do you want to filter on course completion status?' ],
    Blueprint:['Do you want to filter on blueprint courses?', 'Do you want to filter on courses associated with a blueprint course?'],
    Teachers: [],
    'Sub Accounts': [],
    State: [],
    Include: [],
    Sort: [],
    Order: [],
    'Search By': []
}

