const sub_accounts_choices = require('./sub_accounts')


var start_questions = {
  type: 'checkbox',
  name: 'filters',
  message: 'What would you like to search for in courses?',
  choices: ['Enrollments',

      'Published',

      'Blueprint',

      'Teachers',

      'Sub Accounts',

      'State',

      'Include',

      'Sort',

      'Order',

      'Search By'

  ]
}

var with_enrollments = {
  type: 'list',
  name: 'with_enrollments',
  message: 'Do you want to only receive courses with at least one enrollment?',
  choices: ['Yes', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Enrollments');
  },
  filter: function(answer){
    if (answer === "Yes"){
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer 
  }
}

var enrollment_type ={
  type: 'list',
  name: 'enrollment_type',
  message: 'Do you want to only have courses that have at least one person enrolled with this specific user role type?',
  choices: ['teacher', 'student', 'ta', 'observer', 'designer'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Enrollments');
  }
}

var published = {
  type: 'list',
  name: 'published',
  message: 'Do you want to filter on published status?',
  choices: ['Yes', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Published');
  },
  filter: function(answer){
    if (answer === "Yes"){
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
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Published');
  },
  filter: function(answer){
    if (answer === "Yes"){
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
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Blueprint');
  },
  filter: function(answer){
    if (answer === "Yes"){
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer 
  }
}

var blueprint_associated= {
  type: 'list',
  name: 'blueprint_associated',
  message: 'Do you want to filter on courses associated with a blueprint course?',
  choices: ['Yes', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Blueprint');
  },
  filter: function(answer){
    if (answer === "Yes"){
      answer = true
    } else if (answer === 'No') {
      answer = false
    }
    return answer 
  }
}

var by_teachers = {
  type: 'list',
  name: 'by_teacher',
  message: 'Do you want to filter by courses taught by specific teachers?',
  choices: ['WORK WITH AARON ON INPUT TYPE', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Teachers');
  }
}

var by_subaccounts = {
  type: 'checkbox',
  name: 'by_subaccounts',
  message: 'Do you want to filter by courses within sub accounts?',
  choices: sub_accounts_choices,
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Sub Accounts');
  }
}
var state = {
  type: 'checkbox',
  name: 'state',
  message: 'Which course state do you want to filter on?',
  choices: ['Created', 'Claimed', 'Available', 'Completed', 'Deleted', 'All'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'State');
  },
  filter: function(answer){
    return answer.toLowerCase()
  }
}

var enrollment_term_id_q = {
  type: 'list',
  name: 'term_id_q',
  message: 'Would you like to filter by enrollment term id?',
  choices: ['Yes', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Include');
  }
}

var enrollment_term_id = {
  type: 'input',
  name: 'enrollment_term_id',
  message: 'Okay. What is the term ID?',
  when: function (answers) {
      return answers.term_id_q === 'Yes'
  }
}

var search_term_q = {
  type: 'list',
  name: 'search_term_q',
  message: 'Do you want to include a search term?',
  choices: ['Yes', 'No'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Include')
  }
}

var search_term = {
  type: 'input',
  name: 'search_term',
  message: "Okay, what is your search term?",
  when: function (answers) {
      return answers.search_term_q === 'Yes';
  }
}

var include = {
  type: 'list',
  name: 'include',
  message: 'What information would you like to include with your course data?',
  choices: ['Syllabus Body', 'Term', 'Course Progress', 'Storage', 'Total Students', 'Teachers', 'Account Name',
      'Concluded'
  ],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Include')
  }
}

var sort = {
  type: 'list',
  name: 'sort',
  message: 'How would you like to sort the results column by?',
  choices: ['Course Name', 'SIS ID', 'Teacher', 'Account Name'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Sort')
  }
}

var order = {
  type: 'list',
  name: 'order',
  message: 'Do you want the order to be Ascending or Descending?',
  choices: ['Ascending', 'Descending'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Order')
  }
}

var search_by = {
  type: 'list',
  name: 'search_by',
  choices: ['Course', 'Teacher'],
  when: function (answers) {
      return answers.filters.find(ans => ans === 'Search By')
  }
}

var output = {
  type: 'list',
  name: 'Output',
  message: 'How would you like to output this data?',
  choices: ['Node Module', 'CSV', 'JSON', 'Console']
}

var questions = [
  start_questions,
  with_enrollments,
  enrollment_type,
  published,
  completion,
  blueprint,
  blueprint_associated,
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
]

module.exports = questions;