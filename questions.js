const sub_accounts_choices = require('./sub_accounts')
var fs = require('fs');
const canvas = require('canvas-api-wrapper');
const configs = require('./config')

var start_question_choices = [{
  name: 'Enrollments',
  checked: false
},
{
  name: 'Published',
  checked: false
},
{
  name: 'Blueprint',
  checked: false
},
{
  name: 'Teachers',
  checked: false
},
{
  name: 'Sub Accounts',
  checked: false
},
{
  name: 'State',
  checked: false
},
{
  name: 'Include',
  checked: false
},
{
  name: 'Sort',
  checked: false
},
{
  name: 'Order',
  checked: false
},
{
  name: 'Search By',
  checked: false
},
]


var filters = {
  type: 'checkbox',
  name: 'filters',
  message: 'What would you like to search for in courses?',
  choices: start_question_choices,
  when: false,
  validate: function (answer) {
    if (answer.length < 1) {
      return 'You must choose at least one filter';
    }

    return true;
  }
}



var with_enrollments = {
  type: 'list',
  name: 'with_enrollments',
  message: 'Do you want to only receive courses with at least one enrollment?',
  choices: ['Yes', 'No'],
  when: function (answers) {
    if (answers.filters === undefined){
      return false;
    } else if (answers !== undefined){
      if (answers.filters.find(ans => ans === 'Enrollments')) {
        return true;
      }  else {
        return false;
      }
    }

  },
  filter: function (answer) {
    if (answer === "Yes") {
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer
  }
}

var enrollment_type = {
  type: 'checkbox',
  name: 'enrollment_type',
  message: 'Do you want to only have courses that have at least one person enrolled with this specific user role type?',
  choices: ['teacher', 'student', 'ta', 'observer', 'designer'],
  when:false || function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
      return answers.filters.find(ans => ans === 'Enrollments');
    }
  }
}

var published = {
  type: 'list',
  name: 'published',
  message: 'Do you want to filter on published status?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Published');
    }
  },
  filter: function (answer) {
    if (answer === "Yes") {
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer
  }
}
var completion = {
  type: 'list',
  name: 'completion',
  message: 'Do you want to filter on course completion status?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Published');
    }
  },
  filter: function (answer) {
    if (answer === "Yes") {
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer
  }
}

var blueprint = {
  type: 'list',
  name: 'blueprint',
  message: 'Do you want to filter on blueprint courses?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Blueprint');
    }
  },
  filter: function (answer) {
    if (answer === "Yes") {
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer
  }
}

var blueprint_associated = {
  type: 'list',
  name: 'blueprint_associated',
  message: 'Do you want to filter on courses associated with a blueprint course?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Blueprint');
    }
  },
  filter: function (answer) {
    if (answer === "Yes") {
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer
  }
}

var teacher_api_search = {
  type: 'input',
  name: 'teacher_api_search',
  message: 'Enter teacher names, separated by a `|` character. (At least 3 characters)',
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Teachers');
    }
  },
  filter: (answer) => {
    var teachers = answer.split(',');
    teachers = teachers.map((teacher) => {
      return teacher.trim();
    });
    return teachers;
  }
}

var by_teachers = {
  type: 'checkbox',
  name: 'by_teachers',
  message: 'Do you want to filter by courses taught by specific teachers?',
  choices: async (answers) => {
    let allTeachers = [];
    for (let teacher in answers.teacher_api_search) {
      allTeachers = allTeachers.concat(await canvas.get(`/api/v1/accounts/1/users?search_term=${answers.teacher_api_search[teacher]}&include[]=email&role_filter_id=4`))
    }
    delete answers.teacher_api_search;
    allTeachers = allTeachers.map((teacher) => {
      return {
        name: `${teacher.name} (${teacher.email || 'Can\'t Retrieve Email'}) [${teacher.id}]`,
        id: teacher.id
      }
    });
    return allTeachers;
  },
  when: function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Teachers');
    }
  },
  filter: (answer) => {
    let teacherIdRegex = /\[(\d+)\]/;
    var teacherIds = answer.map(ans => {
      return ans.match(teacherIdRegex)[1];
    })
    // Used for debugging shenanigans 
    /* fs.writeFileSync('test.txt', JSON.stringify(teacherIds, null, 4)) */
    return teacherIds;
  }

}


var by_subaccounts = {
  type: 'checkbox',
  name: 'by_subaccounts',
  message: 'Do you want to filter by courses within sub accounts?',
  choices: sub_accounts_choices,
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Sub Accounts');
    }
  },
  filter: async function (answer) {
    let ids = answer.map(ans => {
      var numbers = []
      numbers.push(ans.match(/\d+/g))
      return numbers.toString();
    })
    return ids;
  }
}
var state = {
  type: 'checkbox',
  name: 'state',
  message: 'Which course state do you want to filter on?',
  choices: ['Created', 'Claimed', 'Available', 'Completed', 'Deleted', 'All'],
  when: function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'State');
    }
  },
  filter:function (answer) {
    return answer.map(a => {
      return a.toLowerCase()
    })
  }
}

var enrollment_term_id_q = {
  type: 'list',
  name: 'enrollment_term_id',
  message: 'Would you like to filter by enrollment term id?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Include');
    }
  }
}

var enrollment_term_id = {
  type: 'input',
  name: 'enrollment_term_id',
  message: 'Okay. What is the term ID?',
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.enrollment_term_id === 'Yes'
    }
  }
}

var search_term_q = {
  type: 'list',
  name: 'search_term',
  message: 'Do you want to include a search term?',
  choices: ['Yes', 'No'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Include')
    }
  }
}

var search_term = {
  type: 'input',
  name: 'search_term',
  message: "Okay, what is your search term? (The partial course name, code, or full ID to match and return in the results list. Must be at least 3 characters.)",
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.search_term === 'Yes';
    }
  }
}

var include = {
  type: 'checkbox',
  name: 'include',
  message: 'What information would you like to include with your course data?',
  choices: ['Syllabus Body', 'Term', 'Course Progress', 'Storage', 'Total Students', 'Teachers', 'Account Name',
    'Concluded'
  ],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Include')
    }
  },
  filter: function (answer) {
    return answer.map(ans => {
      return ans.toLowerCase().replace(' ', '_')
    })
  }
}

var sort = {
  type: 'list',
  name: 'sort',
  message: 'How would you like to sort the results column by?',
  choices: ['Course Name', 'SIS ID', 'Teacher', 'Account Name'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Sort')
    }
  },
  filter: function (answer) {
    return answer.toLowerCase().replace(' ', '_')
  }
}

var order = {
  type: 'list',
  name: 'order',
  message: 'Do you want the order to be Ascending or Descending?',
  choices: ['Ascending', 'Descending'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Order')
    }
  },
  filter: function (answer) {
    if (answer === 'Ascending') {
      return 'asc'
    } else if (answer === 'Descending') {
      return 'desc'
    }
  }
}

var search_by = {
  type: 'list',
  name: 'search_by',
  choices: ['Course', 'Teacher'],
  when:function (answers) {
    if(answers.filters === undefined){
      return false
    } else if (answers.filters !== undefined){
    return answers.filters.find(ans => ans === 'Search By')
    }
  },
  filter: function (answer) {
    return answer.toLowerCase()
  }
}

var output = {
  type: 'list',
  name: 'Output',
  message: 'How would you like to output this data?',
  choices: ['Node Module', 'CSV', 'JSON', 'Console'],
  default: 'Node Module'
}

var questions = {
  filters,
  with_enrollments,
  enrollment_type,
  published,
  completion,
  blueprint,
  blueprint_associated,
  teacher_api_search,
  by_teachers,
  by_subaccounts,
  state,
  enrollment_term_id_q,
  enrollment_term_id,
  search_term_q,
  search_term,
  include,
  sort,
  order,
  search_by,
  output
}


function overrideWhen (object, value) {
  // loop through object keys. Keys should correspond with the keys of question object
  // set the 'when' key of the corresponding question object with variable value

/*object.filters.forEach(filter => {
      start_question_choices.forEach(question =>{
        if(question.name === filter){
          question.checked = true
        }
      })
    }) */

    var questions_to_ask = Object.keys(object)

    questions_to_ask.map(question =>{
      console.log(question)
      if (question === 'by_teachers'){
        questions.teacher_api_search.when = value
        questions.by_teachers.when = value
      } else {
        questions[question].when = value
      }
    })
    // Used for debugging shenanigans 
    //console.log(questions)
}



function setDefaultValues (object) {
  // questions not asked basically set the when to false.
  
  console.log(answers)
}

overrideWhen(configs.defaults, true)
//overrideWhen(configs.values, false)
setDefaultValues(configs.values)
var questionsArray = Object.keys(questions).map(questionKey => questions[questionKey])



module.exports = questionsArray;