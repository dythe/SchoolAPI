# School API

This is an API that allows the school system to retrieve information that they require.
	
## Technologies/Prerequisities

Project is created with:
* NodeJS version: 10.15.1
* MySQL version: 10.4.11
* MySQL Workbench version: 8.0

## Database Schema

Explanation of the database schema

* school_information
  * Description: Information of the teachers/students information are stored in this table
    * email - email address of the student/teacher
    * name - name of the student/teacher
    * user_type - 0 = student, 1 = teacher
    * user_status - 0 = not suspended, 1 = suspended
  
* student_to_teacher_registration
  * Description: Information of the teacher-to-student registration/relationship are stored in this table
  * Misc Information: teacher_email and student email are both primary keys (composite key), teacher_email is a foreign key to school_information.email, student_email is a foreign key to school_information.email
      * teacher_email - email address of the teacher
      * student email - email address of the student


## Setup

### **MySQL**

1. MySQL has already been installed, and ensure database settings is configured.
   * Database configuration file is located at **SchoolAPI/config/db.js**


2. Once Step 1 is is all set up, execute the database scripts located at **SchoolAPI/scripts** in **MySQL** to create the initial schema, tables and test data required.

### **Node**

To run this project, install it locally using npm:

```
$ cd SchoolAPI
$ npm install
$ node server.js
```

To run unit test, do the following:

```
$ cd SchoolAPI
$ npm test
```