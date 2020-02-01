const con = require('../config/db.js');
const queries = require('./queries.js');

function writeMessageResponse(responseMessage, response) {
    response.json({ message: responseMessage }, null, 3);
    response.end();
}

function writeJSONResponse(responseMessage, response) {
    response.json(responseMessage, null, 3);
    response.end();
}

function findEmailAddresses(StrObj) {
    var separateEmailsBy = " ";
    var email = "<none>"; // if no match, use this
    var emailsArray = StrObj.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi);
    var emailsList = [];
    if (emailsArray) {
        email = "";
        for (var i = 0; i < emailsArray.length; i++) {
            if (i != 0) email += separateEmailsBy;
            emailsList.push(emailsArray[i]);
        }
    }
    return emailsList;
}

function addRecipients(currentValue, retrieveValues) {
    // check for duplicates while adding
    if (!retrieveValues.recipients.includes(currentValue)) {
        retrieveValues.recipients.push(currentValue);
    }
}

function addStudents(currentValue, retrieveValues) {
    // check for duplicates while adding
    if (!retrieveValues.students.includes(currentValue)) {
        retrieveValues.students.push(currentValue);
    }
}

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

// for unit tesitng
function setUpAndClearDatabase() {
    con.CURRENT_DATABASE = constants.MOCK_SCHOOL;
    if (con.CURRENT_DATABASE = constants.MOCK_SCHOOL) {
        console.log("Current DB: " + con.CURRENT_DATABASE)
        con.pool.query(queries.DELETE_ALL_RECORDS, function (err, result) {
            con.pool.end();
            if (err) throw err;
            console.log("DB Cleared");
        })
    } else {
        console.log("Something went wrong. Please contact the administrator.");
    }
}

module.exports.writeMessageResponse = writeMessageResponse;
module.exports.writeJSONResponse = writeJSONResponse;
module.exports.findEmailAddresses = findEmailAddresses;
module.exports.addRecipients = addRecipients;
module.exports.addStudents = addStudents;
module.exports.getResult = getResult;
module.exports.setUpAndClearDatabase = setUpAndClearDatabase;