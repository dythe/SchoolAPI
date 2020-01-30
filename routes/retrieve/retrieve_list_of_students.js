const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');

router.get('/api/commonstudents', (request, response) => {

    var requestQuery = request.query.teacher;
    console.log("requestQuery: %s", requestQuery);

    con.query("SELECT email FROM school.schoolinformation WHERE connection_to IN (?)",
    [requestQuery] , function (err, result, fields) {
        if (err) {
            response.status(500).end();
            console.log(err)
        }
        else {
            console.log(result);

            // Declaring an array and pushing the values in from the result
            var retrieveValues = {
                students: []
             };

            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.email)
                retrieveValues.students.push(row.email);
            });

            var json = JSON.stringify(retrieveValues, null, 4);

            console.log(json);

            response.write(json);
            response.status(200).end();
        }
    });
    // }
    
})

module.exports = router;