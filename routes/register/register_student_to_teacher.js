const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');

router.post('/api/register', (request, response) => {
    var requestBody = request.body;
    var responseCode;

    if (Object.keys(request.body).length === 0) {
        responseCode = 500;
        helper.writeResponse(responseCode, response, 0);
    }
    else {
        const teacher = requestBody.teacher;
        const students = requestBody.students;

        var teacherType = typeof(teacher);
        var studentType = typeof(students);
        console.log("teacherType: %s", teacherType);
        console.log("studentType: %s", studentType);

        // Check if it is teacher registering to a bunch of students
        // OR student registering to a bunch of teachers
        if (teacherType === "string" && studentType === "string") {
            responseCode = 500;
            response.write("Both cannot be Strings!");
            helper.writeResponse(responseCode, response, 1);
        }
        else if (teacherType === "object" && studentType === "object") {
            responseCode = 500;
            response.write("Both cannot be Objects!")
            helper.writeResponse(responseCode, response, 1);
        }
        else if (teacherType === "object" && studentType === "string") {

            var REGISTER_STUDENT_TO_MANY_TEACHERS_SQL = queries.REGISTER_STUDENT_TO_MANY_TEACHERS;
            var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE =  [];
            
            teacher.forEach(element => {
                REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push([element, students]);
            });

            con.query(REGISTER_STUDENT_TO_MANY_TEACHERS_SQL, [REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], function (err) {
                if (err) {
                    console.log(err);
                    responseCode = 500;
                    helper.writeResponse(responseCode, response, 0);
                }
                else {
                    responseCode = 204;
                    helper.writeResponse(responseCode, response, 0);
                }
            });
        }
        else if (teacherType === "string" && studentType === "object") {

            var REGISTER_TEACHER_TO_MANY_STUDENTS_SQL = queries.REGISTER_TEACHER_TO_MANY_STUDENTS;
            var REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE =  [];
            
            students.forEach(element => {
                REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE.push([teacher, element]);
            });

            console.log(REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE);
            con.query(REGISTER_TEACHER_TO_MANY_STUDENTS_SQL, [REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE] , function (err) {
                if (err) {
                    console.log(err);
                    responseCode = 500;
                    helper.writeResponse(responseCode, response, 0);
                }
                else {
                    responseCode = 204;
                    helper.writeResponse(responseCode, response, 0);
                }
            });
        }
    }

    
})

module.exports = router;