const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

function retrieveListofStudents(request, response) {
    var requestQuery = request.query.teacher;

    console.log("requestQuery: %s", requestQuery);

    var RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS;
    var RETRIEVE_LIST_OF_STUDENTS_VALUE = [requestQuery];

    con.query(RETRIEVE_LIST_OF_STUDENTS_SQL, RETRIEVE_LIST_OF_STUDENTS_VALUE, function (err, result, fields) {
        if (err) {
            helper.writeMessageResponse(constants.GENERIC_ERROR, response);
        }
        else {
            console.log(result);

            // Declaring an array and pushing the values in from the result
            var retrieveValues = {
                students: []
            };

            Object.keys(result).forEach(function (key) {
                var row = result[key];
                helper.addStudents(row.student_email, retrieveValues);
            });

            helper.writeJSONResponse(retrieveValues, response);
        }
    });

};

module.exports.retrieveListofStudents = retrieveListofStudents;