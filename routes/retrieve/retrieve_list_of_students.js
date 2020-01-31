const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');

router.get('/api/commonstudents', (request, response) => {
    var requestQuery = request.query.teacher;
    var responseCode;

    console.log("requestQuery: %s", requestQuery);

    con.query("SELECT student_email FROM school.registration_relationship WHERE teacher_email IN (?)",
    [requestQuery] , function (err, result, fields) {
        if (err) {
            responseCode = 500;
            helper.writeResponse(responseCode, response, 0);
        }
        else {
            responseCode = 200;
            console.log(result);

            // Declaring an array and pushing the values in from the result
            var retrieveValues = {
                students: []
             };

            Object.keys(result).forEach(function(key) {
                var row = result[key];
                retrieveValues.students.push(row.student_email);
            });

            var json = JSON.stringify(retrieveValues, null, 4);

            console.log(json);

            response.write(json);
            helper.writeResponse(responseCode, response, 1);
        }
    });
    
})

module.exports = router;