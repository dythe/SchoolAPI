const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');

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
            responseCode = 400;
            response.write("Both cannot be Strings!");
            helper.writeResponse(responseCode, response, 1);
        }
        else if (teacherType === "object" && studentType === "object") {
            responseCode = 400;
            response.write("Both cannot be Objects!")
            helper.writeResponse(responseCode, response, 1);
        }
        else if (teacherType === "object" && studentType === "string") {
            var teachersArray =  [];
            
            teacher.forEach(element => {
                teachersArray.push([element, students]);
            });

            console.log(teachersArray);
            con.query("INSERT INTO school.registration_relationship (teacher_email, student_email) VALUES ?", [teachersArray] , function (err) {
                if (err) {
                    responseCode = 500;
                    helper.writeResponse(responseCode, response, 0);
                }
                else {
                    responseCode = 200;
                    helper.writeResponse(responseCode, response, 0);
                }
            });
        }
        else if (teacherType === "string" && studentType === "object") {
            var studentsArray =  [];
            
            students.forEach(element => {
                studentsArray.push([teacher, element]);
            });

            console.log(studentsArray);
            con.query("INSERT INTO school.registration_relationship (teacher_email, student_email) VALUES ?", [studentsArray] , function (err) {
                if (err) {
                    responseCode = 500;
                    helper.writeResponse(responseCode, response, 0);
                }
                else {
                    responseCode = 200;
                    helper.writeResponse(responseCode, response, 0);
                }
            });
        }
    }

    
})

module.exports = router;