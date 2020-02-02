const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

function retrieveListofStudents(request, response) {
    var requestQuery = request.query.teacher;

    console.log(request.query.teacher);
    console.log(typeof(request.query.teacher));
    // console.log("request.query: %s", request.query);
    // console.log("requestQuery: %s", requestQuery);
    var teacherType = typeof(request.query.teacher);
    var RETRIEVE_LIST_OF_STUDENTS_SQL;
    var RETRIEVE_LIST_OF_STUDENTS_VALUE = [requestQuery];
    
    // single parameter
    if (teacherType === "string") {
        console.log('string param');
        RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS_SINGLE;
    }
    // multiple parameters
    else if (teacherType === "object") {
        console.log('object param');
        RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS_MULTIPLE;
    }

    con.query(RETRIEVE_LIST_OF_STUDENTS_SQL, RETRIEVE_LIST_OF_STUDENTS_VALUE, function (err, result, fields) {
        if (err) {
            helper.writeMessageResponse(constants.GENERIC_ERROR, response);
        }
        else {
            // console.log(result);

            // Declaring an array and pushing the values in from the result
            var retrieveValues = {
                students: []
            };

            Object.keys(result).forEach(function (key) {
                var row = result[key];
                helper.addStudents(row.student_email, retrieveValues);
            });

            // console.log(retrieveValues);
            helper.writeJSONResponse(retrieveValues, response);
        }
    });

};

module.exports.retrieveListofStudents = retrieveListofStudents;