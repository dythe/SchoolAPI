const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');

router.post('/api/register', (request, response) => {
    var requestBody = request.body;

    if (Object.keys(request.body).length === 0) {
        response.write("An error has encountered").status(500).end();
    }
    else {
        var teacher = requestBody.teacher;
        var students = requestBody.students;
        var teacherType = typeof(teacher);
        var studentType = typeof(students);
        console.log("teacherType: %s", teacherType);
        console.log("studentType: %s", studentType);
    
        // Check if it is teacher registering to a bunch of students
        // OR student registering to a bunch of teachers
        if (teacherType === "string" && studentType === "string") {
            response.write("Both cannot be Strings!")
            response.status(400).end();
        }
        else if (teacherType === "object" && studentType === "object") {
            response.write("Both cannot be Objects!")
            response.status(400).end();
        }
        else if (teacherType === "object" && studentType === "string") {
            con.query("UPDATE school.schoolinformation SET connection_to = ? WHERE email IN (?)", [students, teacher] , function (err) {
                if (err) {
                    response.status(500).end();
                    console.log(err)
                }
                else { 
                    response.status(200).end();
                }
            }); 
        }
        else if (teacherType === "string" && studentType === "object") {
            con.query("UPDATE school.schoolinformation SET connection_to = ? WHERE email IN (?)", [teacher, students] , function (err) {
                if (err) {
                    response.write({ "message": err });
                    response.status(500).end();
                    console.log(err)
                }
                else {
                    response.status(200).end();
                }
            });            
        }
    }

    
})

module.exports = router;