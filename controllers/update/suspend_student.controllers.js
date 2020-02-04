const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function suspendStudent(request, response) {

    const requestBody = request.body;
    const studentToSuspend = requestBody.student;

    // Initialize database connection
    let dbConnection = await con.createNewDBConnection(constants.NORMAL_SCHOOL);

    // message[0] - response message, message[1] - error code
    const message = await validateResponse(requestBody, studentToSuspend, response, dbConnection);
    console.log("message is %s", message);
    helper.writeMessageResponse(message[0], response, message[1]);
}

async function validateResponse(requestBody, studentToSuspend, response, dbConnection) {

    let returnValue = [];

    if (Object.keys(requestBody).length === 0) {
        // console.log("empty body");
        returnValue = helper.statusCodeResolver(constants.EMPTY_BODY);
        return returnValue;
    }
    else {
        const SUSPEND_STUDENT_SQL = queries.SUSPEND_STUDENT;
        const SUSPEND_STUDENT_VALUE = [1, studentToSuspend, studentToSuspend, 0];
    
        dbConnection.query(SUSPEND_STUDENT_SQL, SUSPEND_STUDENT_VALUE, function (err, result) {
            numRows = result.affectedRows;
    
            console.log('numRows value is %s', numRows);

            if (err || numRows == 0) {
                console.log('err value is %s', err);
                returnValue = helper.statusCodeResolver(constants.STUDENT_DOES_NOT_EXISTS);
            }
            else {
                returnValue = helper.statusCodeResolver(constants.STUDENT_IS_NOW_SUSPENDED);
            }
        });
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue), 1000)
    });

    return promise;
}

module.exports = {
    suspendStudent,
    validateResponse
};