const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/db');

// Routes mapping
const quick_registration_of_user = require('./routes/register/quick_registration_of_user.routes')
const register_students_to_teacher = require('./routes/register/register_student_to_teacher.routes')
const retrieve_list_of_students = require('./routes/retrieve/retrieve_list_of_students.routes')
const suspend_student = require('./routes/update/suspend_student.routes')
const retrieve_for_notification = require('./routes/retrieve/retrieve_for_notification.routes')

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(quick_registration_of_user);
app.use(register_students_to_teacher);
app.use(retrieve_list_of_students);
app.use(suspend_student);
app.use(retrieve_for_notification);

app.get('/', function (req, res) {
    res.send('This is the landing page');
});

module.exports = app;