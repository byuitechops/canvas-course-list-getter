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
1. t
1. t
1. t
1. t
1. What information would you like to include with your course data? [`syllabus_body` , `term` , `course_progress` , `storage_quota_used_mb` , `total_students` , `teachers` , `account_name` , `concluded`]
1. t
1. t
1. t

?enrollment_type[]=teacher&enrollment_type[]=student&enrollment_type[]=ta

```javascript


```

---


#### Destination of Outputs



#### Definition of Outputs



---

#### General Requirements


---

#### User Interface Type

Cli and Node Module

-----
-----

# Set Expectations

### Timeline


### Best Mode of Contact


### Next Meeting


### Action Items


#### TechOps

#### Stakeholder


-----

#### *Approved By:*
#### *Approval Date:*
