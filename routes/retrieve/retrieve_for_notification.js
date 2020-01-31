const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const async = require('async');
const queries = require('../../utils/queries.js');

router.post('/api/retrievefornotifications', (request, response) => {
    var requestBody = request.body;
    var responseCode;
    var teacher = requestBody.teacher;
    var notification = requestBody.notification;

    var findEmails = helper.findEmailAddresses(notification);

    var retrieveValues = {
        recipients: []
    };

    // Process emails in notifications that were mentioned
    async function processEmails(emails) {
        console.log("level 1 is %s", emails);

        // 1 - check for suspended and whether he/she is a student in the school
        // 2 - check whether teacher and student pair is registered
        var CHECK_FOR_SUSPENDED_SQL = queries.CHECK_FOR_SUSPENDED_AND_VALID_STUDENT;
        var CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL = queries.CHECK_TEACHER_STUDENT_REGISTRATION_PAIR;
        var CHECK_FOR_SUSPENDED_VALUE = [emails, 1];
        var CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE = [teacher, emails];

        // check for suspended and whether he/she is a student in the school
        con.pool.query(CHECK_FOR_SUSPENDED_SQL, CHECK_FOR_SUSPENDED_VALUE, async function (err1, result1) {
            console.log("level 2 is %s", CHECK_FOR_SUSPENDED_VALUE[0]);
            if (err1) throw err1;
            var res1 = await helper.getResult(CHECK_FOR_SUSPENDED_SQL, CHECK_FOR_SUSPENDED_VALUE)

            console.log("res1 count_value: %s", res1[0].count_value);
            if (res1[0].count_value != 1) {

                // check whether teacher and student pair is registered
                con.pool.query(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL, CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE, async function (err2, result2) {
                    console.log("level 2 is %s", CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[1]);
                    if (err2) throw err2;
                    var res2 = await helper.getResult(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL, CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE)

                    console.log("res2 count_value: %s", res2[0].count_value);

                    // teacher and student pair is not registered pair
                    if (res2 == 0) {
                        console.log("test4 loop");
                        helper.addRecipients(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[0], retrieveValues);
                    }
                    // teacher and student is a registered pair
                    else {
                        console.log("test5 loop");
                        helper.addRecipients(CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_VALUE[1], retrieveValues);
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
    async function checkTeacherStudents() {
        var RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL = queries.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED; 
        var RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE = [teacher, 0];

        // check for teacher's registered students
        con.pool.query(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE, async function (err4, result4) {
            if (err4) throw err4;
            var res4 = await helper.getResult(RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_SQL, RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED_VALUE)

            console.log(res4);

            Object.keys(res4).forEach(function(key) {
                var row = res4[key];
                console.log('test4 %s', row.student_email);
                helper.addRecipients(row.student_email, retrieveValues);
            });
        });

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(retrieveValues), 1000)
        });

        return promise;
    }

    async function main() {
        var recipientsList;

        if (findEmails.length > 0) {
            for (var i = 0; i < findEmails.length; i++) {
                recipientsList = await processEmails(findEmails[i]);
            }
            recipientsList = await checkTeacherStudents(recipientsList);
        }
        else {
            recipientsList = await checkTeacherStudents();
            // console.log(recipientsList);
        }

        console.log(recipientsList);
        // Resolve promise and response send, not using helper for this
        var p2 = Promise.resolve(recipientsList);
        p2.then(function (v) {
            // console.log(v);
            response.write(JSON.stringify(v, null, 3));
            response.send.bind(response);
            response.end();
        }, function (e) {
            console.error(e); // TypeError: Throwing
        });
    }

    main();
})

module.exports = router;