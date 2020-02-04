const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function retrieveForNotification(request, response) {
    const requestBody = request.body;
    const { teacher, notification } = requestBody;

    // Initialize database connection
    let dbConnection = await con.createNewDBConnection(constants.NORMAL_SCHOOL);

    // message[0] - response message, message[1] - error code
    const message = await validateResponse(requestBody, teacher, notification, dbConnection);

    if (message[0] == constants.EMPTY_BODY) {
        helper.writeMessageResponse(message[0], response, message[1]);
    }
    else {
        helper.writeJSONResponse(message[0], response, message[1]);
    }
}

async function validateResponse(requestBody, teacher, notification, dbConnection) {

    let returnValue = [];
    let retrieveValues = {
        recipients: []
    };
    let recipientsList;

    if (Object.keys(requestBody).length === 0) {
        returnValue = helper.statusCodeResolver(constants.EMPTY_BODY);
        return returnValue;
    }
    else {

        let findEmails = await helper.findEmailAddresses(notification);

        if (findEmails.length > 0) {
            recipientsList = await checkTeacherStudents(teacher, retrieveValues, dbConnection);

            console.log('recipientsList.recipients.length', recipientsList.recipients.length);
            if (recipientsList.recipients.length > 0) {
                recipientsList = await processEmails(teacher, findEmails, retrieveValues, dbConnection);
            }
        }
        else {
            recipientsList = await checkTeacherStudents(teacher, retrieveValues, dbConnection);
        }

    }

    let promise = new Promise((resolve, reject) => {
        console.log(recipientsList);    
        if (recipientsList.recipients.length > 0) {
            returnValue = [recipientsList, constants.CODE_SUCCESS];
        }
        else {
            returnValue = [recipientsList, constants.CODE_NOT_FOUND];
        }
        setTimeout(() => resolve(returnValue), 500);
    });

    return promise;
}

// Process emails in notifications that were mentioned
async function processEmails(teacher, emails, retrieveValues, dbConnection) {
    console.log("processing email: %s", emails);

    // res0 - check whether student is valid in school
    // res1 - check whether student is suspended
    const { CHECK_FOR_VALID_STUDENT_SQL, CHECK_FOR_SUSPENDED_STUDENT_SQL } = queries;
    const CHECK_FOR_VALID_STUDENT_VALUE = [emails];
    const CHECK_FOR_SUSPENDED_STUDENT_VALUE = [emails, 0];

    let res0Result = [];

    // check whether student is valid in the school
    dbConnection.query(CHECK_FOR_VALID_STUDENT_SQL, CHECK_FOR_VALID_STUDENT_VALUE, async function (err0, result0) {
        if (err0) throw err0;
        const res0 = await helper.getResult(CHECK_FOR_VALID_STUDENT_SQL, CHECK_FOR_VALID_STUDENT_VALUE, dbConnection)

        Object.keys(res0).forEach(function (key) {
            let row0 = res0[key];
            console.log('(res0) email: %s | row0 count: %s', row0.email, row0.count_value);

            // only push valid student into res0Result
            if (row0.count_value != undefined)
                res0Result.push(row0.email);
        });

        console.log('res0Result %s', res0Result);
        console.log('res0Result.length %s', res0Result.length);

        // if there are at least 1 student continue with next query
        if (res0Result.length > 0) {

            // check for suspended student
            dbConnection.query(CHECK_FOR_SUSPENDED_STUDENT_SQL, CHECK_FOR_SUSPENDED_STUDENT_VALUE, async function (err1, result1) {
                if (err1) throw err1;
                const res1 = await helper.getResult(CHECK_FOR_SUSPENDED_STUDENT_SQL, CHECK_FOR_SUSPENDED_STUDENT_VALUE, dbConnection)

                Object.keys(res1).forEach(function (key) {
                    let row1 = res1[key];
                    console.log('(res1) email: %s | row1 count: %s', row1.email, row1.count_value);

                    // only push students who are not suspended into res1Result
                    if (row1.count_value != undefined)
                        helper.addRecipients(row1.email, retrieveValues);
                });
            });
        }
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(retrieveValues), 500);
    });

    return promise;
}

// Check the list of students for the teacher
async function checkTeacherStudents(teacher, retrieveValues, dbConnection) {
    let RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL = queries.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED;
    let RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE = [teacher, 0];

    // check for teacher's registered students
    dbConnection.query(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE, async function (err4, result4) {
        if (err4) throw err4;
        let res4 = await helper.getResult(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE, dbConnection)

        console.log(res4);

        Object.keys(res4).forEach(function (key) {
            let row = res4[key];
            console.log('checkTeacherStudents student_email %s', row.student_email);
            helper.addRecipients(row.student_email, retrieveValues);
        });
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(retrieveValues), 500);
    });

    return promise;
}

module.exports = {
    retrieveForNotification,
    validateResponse
};