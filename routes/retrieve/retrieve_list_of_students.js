const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');

router.get('/api/commonstudents', (request, response) => {
    var requestQuery = request.query.teacher;
    var responseCode;

    console.log("requestQuery: %s", requestQuery);

    var RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS;
    var RETRIEVE_LIST_OF_STUDENTS_VALUE = [requestQuery];

    con.query(queries.RETRIEVE_LIST_OF_STUDENTS, RETRIEVE_LIST_OF_STUDENTS_VALUE , function (err, result, fields) {
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
                helper.addStudents(row.student_email, retrieveValues);
            });

            var json = JSON.stringify(retrieveValues, null, 4);

            console.log(json);

            response.write(json);
            helper.writeResponse(responseCode, response, 1);
        }
    });
    
})

module.exports = router;