const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

function suspendStudent(request, response) {
    var requestBody = request.body;

    var studentToSuspend = requestBody.student;

    var SUSPEND_STUDENT_SQL = queries.SUSPEND_STUDENT;
    var SUSPEND_STUDENT_VALUE = [1, studentToSuspend, studentToSuspend, 0];

    con.query(SUSPEND_STUDENT_SQL, SUSPEND_STUDENT_VALUE, function (err, result) {
        numRows = result.affectedRows;

        console.log('numRows value is %s', numRows);
        if (err || numRows == 0) {
            console.log(err)
            helper.writeMessageResponse(constants.STUDENT_DOES_NOT_EXISTS, response);
        }
        else {
            helper.writeMessageResponse(constants.STUDENT_IS_NOW_SUSPENDED, response);
        }
    });
}

module.exports.suspendStudent = suspendStudent;