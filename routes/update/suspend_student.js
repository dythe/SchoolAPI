const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');

router.post('/api/suspend', (request, response) => {
    var requestBody = request.body;
    var studentToSuspend = requestBody.student;
    var responseCode;

    var SUSPEND_STUDENT_SQL = queries.SUSPEND_STUDENT;
    var SUSPEND_STUDENT_VALUE = [1, studentToSuspend];
    
    con.query(SUSPEND_STUDENT_SQL, SUSPEND_STUDENT_VALUE, function (err, result) {
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