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

  
    var newQuestions = []
     ans.filters.map(function(a){
        console.log(a.toString())
        if (a === "Enrollments"){
            newQuestions.push(masterQuestions.Enrollments)
        }

        if (a === "Published"){
            newQuestions.push(masterQuestions.Published)
        }

        if (a === "Blueprint")
        {
            newQuestions.push(masterQuestions.Blueprint)
        }




        return newQuestions
    })
    console.log(newQuestions.flat())
}


var masterQuestions =   {
    Enrollments: {
        questions: [{
            message:'Do you want to only receive courses with at least one enrollment?',
            choices: ['true', 'false'], 
        },
        {
            messages:'Do you want to only have courses that have at least one person enrolled with this specific user role type?',
            choices: ['teacher', 'student', 'ta', 'observer', 'designer']  
        }],
        when: (answers) => globalAnswers.filters.Enrollments === true ? true : false
        }, 
    Published: {
        questions: [{
            q: "Do you want to filter on published status?",
            a: ['true', 'false']
        }]
    }
    
    
    
    
    ['', 'Do you want to filter on course completion status?' ],
    Blueprint:['Do you want to filter on blueprint courses?', 'Do you want to filter on courses associated with a blueprint course?'],
    Teachers: ['Do you want to filter by courses taught by specific teachers?'],
    'Sub Accounts': [],
    State: [],
    Include: [],
    Sort: [],
    Order: [],
    'Search By': []
}


if (!Array.prototype.flat) {
    Array.prototype.flat = function() {
      var depth = arguments[0];
      depth = depth === undefined ? 1 : Math.floor(depth);
      if (depth < 1) return Array.prototype.slice.call(this);
      return (function flat(arr, depth) {
        var len = arr.length >>> 0;
        var flattened = [];
        var i = 0;
        while (i < len) {
          if (i in arr) {
            var el = arr[i];
            if (Array.isArray(el) && depth > 0)
              flattened = flattened.concat(flat(el, depth - 1));
            else flattened.push(el);
          }
          i++;
        }
        return flattened;
      })(this, depth);
    };
  }