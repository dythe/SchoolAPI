const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');

router.post('/api/suspend', (request, response) => {
    var requestBody = request.body;
    var studentToSuspend = requestBody.student;
    var responseCode;

    con.query("UPDATE school.schoolinformation SET user_status = ? WHERE email IN (?)", [1, studentToSuspend] , function (err, result) {
        numRows = result.affectedRows;
        if (err || numRows == 0) {
            responseCode = 500;
            helper.writeResponse(responseCode, response, 0);
            console.log(err)
        }
        else {
            responseCode = 204;
            helper.writeResponse(responseCode, response, 0);
        }
    });
})

module.exports = router;