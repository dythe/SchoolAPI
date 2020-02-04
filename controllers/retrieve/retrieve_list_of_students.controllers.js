const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function retrieveListofStudents(request, response) {

    const requestParameters = request.query.teacher;
    const teacherType = typeof (request.query.teacher);

    console.log(requestParameters);

    // Initialize database connection
    let dbConnection = await con.createNewDBConnection(constants.NORMAL_SCHOOL);

    // message[0] - response message, message[1] - error code
    const message = await validateResponse(requestParameters, teacherType, response, dbConnection);

    if (message[0] == constants.EMPTY_PARAMETERS) {
        helper.writeMessageResponse(message[0], response, message[1]);
    }
    else {
        helper.writeJSONResponse(message[0], response, message[1]);
    }
};

async function validateResponse(requestParameters, teacherType, response, dbConnection) {

    let returnValue = [];
    let retrieveValues = {
        students: []
    };
    console.log('requestParameters value is %s', requestParameters);

    if (requestParameters === undefined) {
        returnValue = helper.statusCodeResolver(constants.EMPTY_PARAMETERS);
        return returnValue;
    } else {
        let RETRIEVE_LIST_OF_STUDENTS_SQL;
        let RETRIEVE_LIST_OF_STUDENTS_VALUE;

        let i = 0;
        let currentLetter = 'a';
        let previousLetter = 'a';

        // single parameter
        if (teacherType === constants.STR_VAL) {
            console.log('string param');
            RETRIEVE_LIST_OF_STUDENTS_VALUE = [requestParameters];
            RETRIEVE_LIST_OF_STUDENTS_SQL = queries.RETRIEVE_LIST_OF_STUDENTS_SINGLE;
        }
        // multiple parameters
        else if (teacherType === constants.OBJ_VAL) {
            RETRIEVE_LIST_OF_STUDENTS_SQL = `SELECT DISTINCT ${currentLetter}.student_email FROM `;
            console.log('object param');

            Object.keys(requestParameters).forEach(function (key) {
                let teacherEmail = requestParameters[key];
                console.log('teacherEmail %s', teacherEmail);

                if (i == 0) {
                    RETRIEVE_LIST_OF_STUDENTS_SQL += `(SELECT DISTINCT ${currentLetter}.student_email FROM student_to_teacher_registration ${currentLetter} WHERE teacher_email IN ('${teacherEmail}')) ${currentLetter}`;
                }
                else {
                    RETRIEVE_LIST_OF_STUDENTS_SQL += ` INNER JOIN (SELECT DISTINCT ${currentLetter}.student_email FROM student_to_teacher_registration ${currentLetter} WHERE ${currentLetter}.teacher_email IN ('${teacherEmail}')) ${currentLetter} ON ${previousLetter}.student_email = ${currentLetter}.student_email`;
                }

                // console.log(RETRIEVE_LIST_OF_STUDENTS_SQL);
                previousLetter = currentLetter;
                currentLetter = helper.nextChar(currentLetter);
                i = i + 1;
            });
        }

        console.log(RETRIEVE_LIST_OF_STUDENTS_SQL);
        dbConnection.query(RETRIEVE_LIST_OF_STUDENTS_SQL, RETRIEVE_LIST_OF_STUDENTS_VALUE, function (err, result, fields) {
            if (err) {
                console.log(err);
                helper.errorCodeResolver(err.errno, response);
            }
            else {
                // Declaring an array and pushing the values in from the result
                Object.keys(result).forEach(function (key) {
                    let row = result[key];
                    console.log('row values is: %s', row);
                    helper.addStudents(row.student_email, retrieveValues);
                });

                console.log(retrieveValues);
            }
        });
    }

    console.log(retrieveValues.students);
    if (Object.keys(retrieveValues).length > 0) {
        returnValue = [retrieveValues, constants.CODE_SUCCESS];
    }
    else {
        returnValue = [retrieveValues, constants.CODE_NOT_FOUND];
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue), 1000)
    });

    return promise;
}

module.exports = {
    retrieveListofStudents,
    validateResponse
};