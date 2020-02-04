# School API

This is an API that allows the teachers to utilize the school system to retrieve information that they require.
	
## Technologies/Prerequisities

Project is created with:
* NodeJS 10.15.1
  * Libraries:
    * jest 25.1.0
    * eslint 6.8.0
    * axios 0.19.2
    * body-parser 1.19.0
    * express 4.17.1
    * mysql 2.18.1
* MySQL 10.4.11
* MySQL Workbench 8.0

## Setup

### **MySQL**

1. Ensure that MySQL has already been installed and database settings is configured according to your settings.
   * Database configuration file is located at `SchoolAPI/config/db.js`

Default database settings are:

```javascript
const host = 'localhost';
const user = 'root';
const password = '';
```

2. Once Step 1 is is all set up, execute the database scripts located at `SchoolAPI/scripts` in **MySQL** to create the initial schema, tables and test data required.

3. Using postman/web browser you can access `http://localhost:8081`/api/*{api name here}* which is the default api address

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

**Note:** The project will switch between the normal API database schema `(school)` and unit testing schema `(mock_school)` automatically

### **Postman**

- `/postman/School API.postman_collection.json` - contains a list of API calls that can be used

## API Routes
* `/api/quickregistration` - quick registration of a user
* `/api/register` - registering of students to teachers or vice versa
* `/api/retrievefornotifications` - retrieve a list of students who can receive a notification
* `/api/commonstudents` - retrieve a list of students common to the teacher
* `/api/suspend` - suspend a specified student

## Database Schema

It contains the two schemas `school` for normal usage and `mock_school` for unit testing which both contains the same tables:

* `school_information`
    * Description: Information of the teachers/students information are stored in this table
        * `email` - email address of the student/teacher
        * `name` - name of the student/teacher
        * `user_type` - 0 = student, 1 = teacher
        * `user_status` - 0 = not suspended, 1 = suspended
  
* `student_to_teacher_registration`
    * Description: Information of the teacher-to-student registration/relationship are stored in this table
    * Misc Information: teacher_email and student email are both primary keys (composite key), teacher_email is a foreign key to school_information.email, student_email is a foreign key to school_information.email
        * `teacher_email` - email address of the teacher
        * `student email` - email address of the student