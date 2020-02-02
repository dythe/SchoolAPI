const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function retrieveForNotification(request, response) {
    const requestBody = request.body;
    const teacher = requestBody.teacher;
    const notification = requestBody.notification;
    const message = await validateResponse(requestBody, teacher, notification);

    // console.log(recipientsList);
    const p2 = Promise.resolve(message);
    p2.then(function (v) {
        helper.writeJSONResponse(v, response);
    }, function (e) {
        console.error(e); // TypeError: Throwing
    });
}

async function validateResponse(requestBody, teacher, notification) {

    let returnValue = "";

    if (Object.keys(requestBody).length === 0) {
        returnValue = constants.EMPTY_BODY
        return returnValue;
    }
    else {
        let retrieveValues = {
            recipients: []
        };

        let findEmails = helper.findEmailAddresses(notification);

        let recipientsList;

        if (findEmails.length > 0) {
            for (let i = 0; i < findEmails.length; i++) {
                recipientsList = await processEmails(teacher, findEmails[i], retrieveValues);
            }
            recipientsList = await checkTeacherStudents(teacher, retrieveValues);
        }
        else {
            recipientsList = await checkTeacherStudents(teacher, retrieveValues);
            // console.log(recipientsList);
        }

        returnValue = recipientsList;
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue), 1000)
    });

    return promise;
}

// Process emails in notifications that were mentioned
async function processEmails(teacher, emails, retrieveValues) {
    console.log("processing email: %s", emails);

    // res0 - check for valid student
    // res1 - check for suspended and whether he/she is a student in the school
    // res2 - check whether teacher and student pair is registered
    const CHECK_FOR_VALID_STUDENT_SQL = queries.CHECK_FOR_VALID_STUDENT;
    const CHECK_FOR_SUSPENDED_STUDENT_SQL = queries.CHECK_FOR_SUSPENDED_STUDENT;
    const CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL = queries.CHECK_TEACHER_STUDENT_REGISTRATION_PAIR;

    const CHECK_FOR_VALID_STUDENT_VALUE = [emails];
    const CHECK_FOR_SUSPENDED_STUDENT_VALUE = [emails, 1];
    const CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE = [teacher, emails];

    // check whether student is valid in the school
    con.pool.query(CHECK_FOR_VALID_STUDENT_SQL, CHECK_FOR_VALID_STUDENT_VALUE, async function (err0, result0) {
        if (err0) throw err0;
        const res0 = await helper.getResult(CHECK_FOR_VALID_STUDENT_SQL, CHECK_FOR_VALID_STUDENT_VALUE)

        if (res0[0].count_value0 > 0) {
            // check for whether student is suspended
            con.pool.query(CHECK_FOR_SUSPENDED_STUDENT_SQL, CHECK_FOR_SUSPENDED_STUDENT_VALUE, async function (err1, result1) {
                // console.log("checking for suspended %s", CHECK_FOR_SUSPENDED_STUDENT_VALUE[0]);
                if (err1) throw err1;
                const res1 = await helper.getResult(CHECK_FOR_SUSPENDED_STUDENT_SQL, CHECK_FOR_SUSPENDED_STUDENT_VALUE)

                // console.log("suspended (res1) count_value: %s", res1[0].count_value);
                if (res1[0].count_value != 1) {

                    // check whether teacher and student pair is registered
                    con.pool.query(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL, CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE, async function (err2, result2) {
                        // console.log("registered pair (res2) is %s", CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[1]);
                        if (err2) throw err2;
                        const res2 = await helper.getResult(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL, CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE)

                        // console.log("registered pair (res2) count_value: %s", res2[0].count_value);

                        // teacher and student pair is not registered pair
                        if (res2 == 0) {
                            // console.log("test4 loop");
                            helper.addRecipients(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[0], retrieveValues);
                        }
                        // teacher and student is a registered pair
                        else {
                            // console.log("test5 loop");
                            helper.addRecipients(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[1], retrieveValues);
                        }
                    });
                }
            });
        }
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(retrieveValues), 1000)
    });

    return promise;
}

// Check the students of a teacher
async function checkTeacherStudents(teacher, retrieveValues) {
    let RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL = queries.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED;
    let RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE = [teacher, 0];

    // check for teacher's registered students
    con.pool.query(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE, async function (err4, result4) {
        if (err4) throw err4;
        let res4 = await helper.getResult(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE)

        console.log(res4);

        Object.keys(res4).forEach(function (key) {
            let row = res4[key];
            console.log('checkTeacherStudents student_email %s', row.student_email);
            helper.addRecipients(row.student_email, retrieveValues);
        });
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(retrieveValues), 1000)
    });

    return promise;
}
module.exports.retrieveForNotification = retrieveForNotification;
module.exports.validateResponse = validateResponse;