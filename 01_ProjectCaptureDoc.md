# Project Capture Document for Canvas Course List Getter
#### *Author*: Aaron Shiffler and Cameron Thompson
#### *Stakeholder(s)*: Josh McKinney, Internal Tool
#### *Date*: 15 May 2019
#### *See Also*: [Key Components](./KeyComponentsDoc.md), [README](./README.md)

---

## Background
Josh and his team uses lists of Canvas courses to run certain tools quite often. Most of the time, there is some sort of filtering that needs to be done to a list of courses before they run their tool. This creates lots of duplicate code. In order to reduce duplicate code, save time, and have a more robust way of retrieving courses, we are being asked to create this tool to generate lists of courses that can be consumed by his tools. 


---

## Recap (tl;dr)

Gernerate a list of courses to be consumed by other programs based on select settings.

-----
-----

# Requirements

#### Source of Inputs

Dependant on the use case of the tool. It is decided by the end-user. 

#### Definition of Inputs

The core inputs to the program will answer these questions:
1. Do you want to only recieve courses with at least one enrollment? (`true`, `false`)
1. Do you want to only have courses that have at least one person enrolled with this specific user role type?: [`teacher`, `student`, `ta`, `observer`, `designer`] (check later: Does this filter add to itself, or filter itself?)
1. Do you want to filter on published status (`true`,`false`)
1. Do you want to filter on course completion status? (`true`, `false`)
1. Do you want to filter on blueprint courses? (`true`, `false`)
1. Do you want to filter on courses associated with a blueprint course? (`true`, `false`)
1. Do you want to filter by courses taught by specific teachers? [`Any Teacher ID`, `Any Teacher ID`]
1. Do you want to filter by courses within subaccounts? [`Any Subaccount ID`,`Any Subaccount ID 2`]
1. Which course state do you want to filter on? (`created`, `claimed`, `available`, `completed`, `deleted`, `all`)
1. Would you like to filter by enrollment term id? (`enrollment term id`)
1. Do you want to include a search term? (`Yes`,`No` (If yes require a response of the term. If no then don't include a term.))
1. What information would you like to include with your course data? [`syllabus_body` , `term` , `course_progress` , `storage_quota_used_mb` , `total_students` , `teachers` , `account_name` , `concluded`]
1. How would you like to sort the results column by?: (`course_name`, `sis_course_id`, `teacher`, `account_name`)
1. Do you want the order to be Ascending or Descending? (`asc`, `desc`)
1. Do you want to search by the name of a course or teacher? (`course`, `teacher`)
1. How would you like to output this data? [`Node Module`, `csv`, `json`, `console`]

These questions will be answerable through a CLI or a DefaultConfig File

---


#### Destination of Outputs

1. A selected output folder as a JSON or CSV
1. Directly into the inputs of a node module


#### Definition of Outputs

Node Module and JSON will look like: `https://canvas.instructure.com/doc/api/courses.html#Course`
CSV will have corresponding Column names as JSON keys. Complex Objects will be stored as JSON strings within the CSV.

---

#### General Requirements

- Must be able to filter out which questions the program checks for or asks.
- Take pure CLI inputs, or a config file as input, or hybrid
- If config file is broken or missing information, that data will be prompted for in the CLI.
- Using the prompted information, a querystring will be built to fit the syntax required for the Canvas API call defined at this link: `https://canvas.instructure.com/doc/api/all_resources.html#method.accounts.courses_api`, based on this base uri `/api/v1/accounts/1/courses`. The course list created will the response data from that generated API call.

---

#### User Interface Type

Cli and Node Module

-----
-----

# **Set Expectations**

### **Timeline**
2 weeks

### **Best Mode of Contact**
Slack, in-person

### **Next Meeting**
20 May 2019

### **Action Items**

#### TechOps
Complete Design, ub code, write all questions that will be asked.

#### Stakeholder
None


-----

#### *Approved By:*
#### *Approval Date:*
