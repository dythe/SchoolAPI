const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');
const db = require('../../config/db');

function retrieveListofStudents(request, response) {

    var requestQuery = request.query.teacher;

    if (requestQuery == undefined) {
        helper.errorCodeResolver(response.errno, response);

    } else {
        console.log(request.query.teacher);
        var teacherType = typeof (request.query.teacher);
        var RETRIEVE_LIST_OF_STUDENTS_SQL;
        var RETRIEVE_LIST_OF_STUDENTS_VALUE;

        var i = 0;
        var currentLetter = 'a';
        var previousLetter = 'a';

        // single parameter
        if (teacherType === "string") {
            console.log('string param');
            RETRIEVE_LIST_OF_STUDENTS_VALUE = [requestQuery];
            RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS_SINGLE;
        }
        // multiple parameters
        else if (teacherType === "object") {
            RETRIEVE_LIST_OF_STUDENTS_SQL = `SELECT DISTINCT ${currentLetter}.student_email FROM `;
            console.log('object param');

            Object.keys(requestQuery).forEach(function (key) {
                var row = requestQuery[key];
                console.log('row.teacher %s', row);
                if (i == 0) {
                    RETRIEVE_LIST_OF_STUDENTS_SQL += `(SELECT DISTINCT ${currentLetter}.student_email FROM ${db.CURRENT_DATABASE}.student_to_teacher_registration ${currentLetter} WHERE teacher_email IN ('${row}')) ${currentLetter}`;
                }
                else {
                    RETRIEVE_LIST_OF_STUDENTS_SQL += ` INNER JOIN (SELECT DISTINCT ${currentLetter}.student_email FROM ${db.CURRENT_DATABASE}.student_to_teacher_registration ${currentLetter} WHERE ${currentLetter}.teacher_email IN ('${row}')) ${currentLetter} ON ${previousLetter}.student_email = ${currentLetter}.student_email`;
                }

                previousLetter = currentLetter;
                currentLetter = helper.nextChar(currentLetter);
                i = i + 1;
            });
        }

        console.log(RETRIEVE_LIST_OF_STUDENTS_SQL);
        con.query(RETRIEVE_LIST_OF_STUDENTS_SQL, RETRIEVE_LIST_OF_STUDENTS_VALUE, function (err, result, fields) {
            if (err) {
                console.log(err);
                helper.errorCodeResolver(err.errno, response);
            }
            else {
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
    }
};

module.exports.retrieveListofStudents = retrieveListofStudents;