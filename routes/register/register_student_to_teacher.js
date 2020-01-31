const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

router.post('/api/register', (request, response) => {
    var requestBody = request.body;

    if (Object.keys(request.body).length === 0) {
        helper.writeResponse(constants.GENERIC_ERROR, response);
    }
    else {
        const teacher = requestBody.teacher;
        const students = requestBody.students;

        var teacherType = typeof (teacher);
        var studentType = typeof (students);
        // console.log("teacherType: %s", teacherType);
        // console.log("studentType: %s", studentType);

        // Check if it is teacher registering to a bunch of students
        // OR student registering to a bunch of teachers
        if (teacherType === "string" && studentType === "string") {
            helper.writeResponse(constants.INVALID_TEACHER_TO_STUDENT_DATA, response);
        }
        else if (teacherType === "object" && studentType === "object") {
            helper.writeResponse(constants.INVALID_TEACHER_TO_STUDENT_DATA, response);
        }
        else if (teacherType === "object" && studentType === "string") {

            var REGISTER_STUDENT_TO_MANY_TEACHERS_SQL = queries.REGISTER_STUDENT_TO_MANY_TEACHERS;
            var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];

            teacher.forEach(element => {
                REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push([element, students]);
            });

            con.query(REGISTER_STUDENT_TO_MANY_TEACHERS_SQL, [REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], function (err) {
                if (err) {
                    // console.log(err);
                    helper.writeResponse(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS, response);
                }
                else {
                    helper.writeResponse(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, response);
                }
            });
        }
        else if (teacherType === "string" && studentType === "object") {

            var REGISTER_TEACHER_TO_MANY_STUDENTS_SQL = queries.REGISTER_TEACHER_TO_MANY_STUDENTS;
            var REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE = [];

            students.forEach(element => {
                REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE.push([teacher, element]);
            });

            // console.log(REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE);
            con.query(REGISTER_TEACHER_TO_MANY_STUDENTS_SQL, [REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE], function (err) {
                if (err) {
                    // console.log(err);
                    helper.writeResponse(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS, response);
                }
                else {
                    helper.writeResponse(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, response);
                }
            });
        }
    }


})

module.exports = router;