# School API

This is an API that allows the school system to retrieve information that they require.
	
## Technologies/Prerequisities

Project is created with:
* NodeJS version: 10.15.1
* MySQL version: 10.4.11
* MySQL Workbench version: 8.0

## Setup

### **MySQL**

1. MySQL has already been installed, and ensure database settings is configured.
   * Database configuration file is located at **SchoolAPI/config/db.js**

To use **standard API** change the **CURRENT_DATABASE** value to **constants.NORMAL_SCHOOL**;
```javascript
var CURRENT_DATABASE = constants.NORMAL_SCHOOL;
```

To do **unit test API** change the **CURRENT_DATABASE** value to **constants.MOCK_SCHOOL**;
```javascript
var CURRENT_DATABASE = constants.MOCK_SCHOOL;
```

2. Once this are all setup, run the database scripts located at **SchoolAPI/scripts** in **MySQL** to create the initial schema and tables

### **Node**

To run this project, install it locally using npm:

```
$ cd SchoolAPI
$ npm install
$ node server.js
```

To run unit test, ensure that CURRENT_DATABASE value is changed to **constants.MOCK_SCHOOL** before doing the following:

```
$ npm test
```