const port = 8081;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./config/db');

// Routes mapping
const quick_registration_of_user = require('./routes/register/quick_registration_of_user')
const register_students_to_teacher = require('./routes/register/register_student_to_teacher')
const retrieve_list_of_students = require('./routes/retrieve/retrieve_list_of_students')

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(quick_registration_of_user);
app.use(register_students_to_teacher);
app.use(retrieve_list_of_students);

app.get('/', function (req, res) {
    res.send('This is the landing page');
 });
 
var server = app.listen(port, function () {
    console.log("NodeJS Server running on port %s", port)
 });