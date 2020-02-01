const con = require('../config/db.js');
const queries = require('./queries.js');
const constants = require('./constants.js');

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

function setDatabase() {
    con.CURRENT_DATABASE = constants.MOCK_SCHOOL;
}

// for unit tesitng
function clearDatabase(databaseName) {

    var querytable;

    if (databaseName == constants.SCHOOL_INFORMATION) {
        querytable = queries.DELETE_ALL_RECORDS_STUDENT_INFORMATION;
        console.log('clear1');
    }
    else if (databaseName == constants.STUDENT_TO_TEACHER_REGISTRATION) {
        querytable = queries.DELETE_ALL_RECORDS_FROM_STUDENT_TO_TEACHER;
        console.log('clear2');
    }

    if (con.CURRENT_DATABASE == constants.MOCK_SCHOOL) {
        // console.log("Current DB: " + con.CURRENT_DATABASE)
        con.pool.query(querytable, function (err, result) {
            // con.pool.end();
            if (err) throw err;
        })
    } else {
        console.log("Something went wrong. Please contact the administrator.");
    }
}

// SQL error code resolver
function errorCodeResolver(errno, response) {
    switch (errno) {
        case constants.FOREIGN_KEY_CONSTRAINT:
            writeMessageResponse(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST, response);
            break;
        case constants.DUPLICATE_ENTRY:
            writeMessageResponse(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS, response);
            break;
        default:
            writeMessageResponse(constants.GENERIC_ERROR, response);
            break;
    }
}

module.exports.writeMessageResponse = writeMessageResponse;
module.exports.writeJSONResponse = writeJSONResponse;
module.exports.findEmailAddresses = findEmailAddresses;
module.exports.addRecipients = addRecipients;
module.exports.addStudents = addStudents;
module.exports.getResult = getResult;
module.exports.clearDatabase = clearDatabase;
module.exports.setDatabase = setDatabase;
module.exports.errorCodeResolver = errorCodeResolver;