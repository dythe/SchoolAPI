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

    console.log(emails);

    var retrieveValues = {
        recipients: []
    };


    for (var i = 0; i < emails.length; i++) {
        console.log(emails[i]);
        
        // 1 - check for suspended
        // 2 - check whether teacher and student pair is registered
        var sql1 = 'SELECT COUNT(*) as count_value FROM school.schoolinformation WHERE email = ? AND user_status = ?';
        var sql2 = 'SELECT COUNT(*) as count_value2 FROM school.registration_relationship WHERE teacher_email = ? AND student_email = ?';
        var sqlvalues1 = [emails[i], 1];
        var sqlvalues2 = [teacher, emails[i]];

        con.pool.query(sql1, sqlvalues1, async function (err, result) {
            if (err) throw err;
            var res = await getResult(sql1, sqlvalues1)
            console.log("(1) res value is %s", res[0].count_value);
            // var db_name = result[i].db_name;
            // console.log(db_name);
            // var sql = sql2.replace("{0}", db_name)
            // var res = await getResult(sql)
            // console.log(db_name + ',' + res[0].solution); //Here db_name is showed only the last one.

            con.pool.query(sql2, sqlvalues2, async function (err, result) {
                if (err) throw err;
                var res = await getResult(sql2, sqlvalues2)
                console.log("(2) res value is %s", res[0].count_value2);
                // var db_name = result[i].db_name;
                // console.log(db_name);
                // var sql = sql2.replace("{0}", db_name)
                // var res = await getResult(sql)
                // console.log(db_name + ',' + res[0].solution); //Here db_name is showed only the last one.
            });
        });
    };

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

        con.pool.end();
    }

    // const result = new Promise((resolve, reject) => {
    //     con.query('SELECT COUNT(*) as count_value FROM school.schoolinformation WHERE email = ? AND user_status = ?', [dataElement, 1], function (err, result, fields) {
    //         // con.query('SELECT COUNT(*) as count_value FROM school.schoolinformation WHERE email = ? AND user_status = ?; SELECT COUNT(*) as count_value2 FROM school.registration_relationship WHERE teacher_email = ? AND student_email = ?', [dataElement, 1, teacher, dataElement], function (err, result, fields) {
    //         // console.log("dataElements %s", dataElement);
    //         if (!err) {
    //             // console.log("Count value 1: %s",result[0][0].count_value);
    //             // console.log("Count value 2: %s",result[1][0].count_value2);
    //             // var suspended = result[0][0].count_value;
    //             // var registerWithTeacher = result[1][0].count_value;

    //             // console.log(result);
    //             var suspended = result[0].count_value;
    //             // Does such an email exist? (0 - NOT SUSPENDED, 1 - SUSPENDED) - suspended
    //             // If 1 means it is a registered pair - registerWithTeacher
    //             // has been mentioned in notification
    //             // Is registered with the teacher
    //             if (suspended == 0) {
    //                 console.log("pushing %s", dataElement);
    //                 resolve(dataElement);
    //             }
    //             else {
    //                 responseCode = 500;
    //                 helper.writeResponse(responseCode, response, 0);
    //             }
    //         }
    //         else {
    //             responseCode = 204;
    //             helper.writeResponse(responseCode, response, 0);
    //         }
    //     });

    //     // do some stuff here
    //     // console.log(result);

    //     retrieveValues.recipients.push(await result);
    //     console.log(retrieveValues);
    //     response.end();

})





module.exports = router;