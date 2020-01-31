const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const async = require('async');

router.post('/api/retrievefornotifications', (request, response) => {
    var requestBody = request.body;
    var responseCode;
    var teacher = requestBody.teacher;
    var notification = requestBody.notification;

    var emails = helper.findEmailAddresses(notification);

    var retrieveValues = {
        recipients: []
    };

    // console.log(emails);

    // Process emails in notifications
    async function processEmails(emails) {

        // emails consist of those who were mentioned/notified, check condition whether they are eligible to be placed in recipients list
        for (var i = 0; i < emails.length; i++) {

            console.log("initial");
            console.log(emails[i]);

            // 1 - check for suspended
            // 2 - check whether teacher and student pair is registered
            var sql1 = 'SELECT COUNT(*) as count_value FROM school.schoolinformation WHERE email = ? AND user_status = ?';
            var sql2 = 'SELECT COUNT(*) as count_value2 FROM school.registration_relationship WHERE teacher_email = ? AND student_email = ?';
            var sqlvalues1 = [emails[i], 1];
            var sqlvalues2 = [teacher, emails[i]];
            // var sqlvalues3 = [emails[i], 0];

            // check for suspended
            con.pool.query(sql1, sqlvalues1, async function (err1, result1) {
                if (err1) throw err1;
                var res1 = await getResult(sql1, sqlvalues1)
                if (res1 > 0) return; // if result found skip to next email

                // check whether teacher and student pair is registered
                con.pool.query(sql2, sqlvalues2, async function (err2, result2) {
                    if (err2) throw err2;
                    var res2 = await getResult(sql2, sqlvalues2)

                    // teacher and student pair is not registered
                    if (res2 == 0) {
                        console.log("test4 loop %s", i);
                        retrieveValues.recipients.push(sqlvalues3[0]);
                    }
                    else {
                        console.log("test3 loop %s", i);
                        retrieveValues.recipients.push(sqlvalues2[1]);
                        // console.log(retrieveValues);
                    }
                });
            });
        };

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(retrieveValues), 1000)
        });

        return promise;
    }

    // Check the students of a teacher
    async function checkTeacherStudents() {
        var sql4 = 'SELECT student_email FROM school.registration_relationship WHERE teacher_email = ?';
        var sqlvalues4 = [teacher];

        // check for teacher's registered students
        con.pool.query(sql4, sqlvalues4, async function (err4, result4) {
            if (err4) throw err4;
            var res4 = await getResult(sql4, sqlvalues4)

            if (res4.length > 0) {
                console.log("test2");
                retrieveValues.recipients.push(res4[0].student_email);
            }
        });

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(retrieveValues), 1000)
        });

        return promise;
    }

    async function main() {
        var recipientsList;

        if (emails.length > 0) {
            recipientsList = await processEmails(emails);
            recipientsList = await checkTeacherStudents(recipientsList);
        }
        else {
            recipientsList = await checkTeacherStudents();
            console.log(recipientsList);
        }

        // console.log("IM OUT HERE");
        // console.log(recipientsList);
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

    function getResult(sql, sqlvalues) {
        // console.log("getResult SQL Query: %s", sql);
        return new Promise(function (resolve, reject) {
            con.pool.query(sql, sqlvalues, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
})

module.exports = router;