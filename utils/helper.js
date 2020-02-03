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

async function findEmailAddresses(StrObj) {

    console.log(StrObj);
    const separateEmailsBy = " ";
    let email = "<none>"; // if no match, use this
    const emailsArray = StrObj.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi);
    let emailsList = [];
    if (emailsArray) {
        email = "";
        for (var i = 0; i < emailsArray.length; i++) {
            if (i != 0) email += separateEmailsBy;
            emailsList.push(emailsArray[i]);
        }
    }
    // return emailsList;
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(emailsList), 1000)
    });

    return promise;
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

// SQL error code resolver
function errorCodeResolver(errno) {
    switch (errno) {
        case constants.FOREIGN_KEY_CONSTRAINT:
            return constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST;
        case constants.DUPLICATE_ENTRY:
            return constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS;
        case constants.QUERY_WAS_EMPTY:
            return constants.TEACHER_DATA_NOT_REQUESTED;
        default:
            return constants.GENERIC_ERROR;
    }
}

function createJSON(messagevalue) {
    message = { message: messagevalue };
    return message;

}
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function getResult(sql, sqlvalues, dbConnection) {
    // console.log("getResult SQL Query: %s", sql);
    return new Promise(function (resolve, reject) {
        dbConnection.query(sql, sqlvalues, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

// for unit testing 
async function executeQueryToDatabase(values, schemaName, query, dbConnection) {
    const SQL_QUERY = query;
    const SQL_VALUES = values;

    if (schemaName == constants.MOCK_SCHOOL) {
        dbConnection.query(SQL_QUERY, SQL_VALUES, function (err, result) {
            console.log(SQL_QUERY);
            console.log(SQL_VALUES);
            if (err) throw err;
        })
    } else {
        console.log("Something went wrong. Please contact the administrator.");
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(dbConnection), 1000)
    });

    return promise;
}

// for unit testing
async function clearDatabase(tableName, schemaName, dbConnection) {

    let querytable;

    if (tableName == constants.SCHOOL_INFORMATION) {
        querytable = queries.DELETE_ALL_RECORDS_STUDENT_INFORMATION;
    }
    else if (tableName == constants.STUDENT_TO_TEACHER_REGISTRATION) {
        querytable = queries.DELETE_ALL_RECORDS_FROM_STUDENT_TO_TEACHER;
    }

    if (schemaName == constants.MOCK_SCHOOL) {
        // console.log("Current DB: " + con.CURRENT_DATABASE)
        dbConnection.query(querytable, function (err, result) {
            if (err) throw err;
        })

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(dbConnection), 1000)
        });

        return promise;
    } else {
        console.log("Something went wrong. Please contact the administrator.");
    }
}

// for unit tesitng
async function deleteFromDatabase(valuesToDelete, schemaName, dbConnection) {
    const SQL_QUERY = queries.DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS;
    const DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS_VALUE = valuesToDelete;

    if (schemaName == constants.MOCK_SCHOOL) {
        dbConnection.query(SQL_QUERY, DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS_VALUE, function (err, result) {
            if (err) throw err;
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => resolve(dbConnection), 1000)
            });
    
            return promise;
        })
    } else {
        console.log("Something went wrong. Please contact the administrator.");
    }
}
module.exports.executeQueryToDatabase = executeQueryToDatabase;
module.exports.clearDatabase = clearDatabase;
module.exports.deleteFromDatabase = deleteFromDatabase;

module.exports.createJSON = createJSON;
module.exports.nextChar = nextChar;
module.exports.writeMessageResponse = writeMessageResponse;
module.exports.writeJSONResponse = writeJSONResponse;
module.exports.findEmailAddresses = findEmailAddresses;
module.exports.addRecipients = addRecipients;
module.exports.addStudents = addStudents;
module.exports.getResult = getResult;
module.exports.errorCodeResolver = errorCodeResolver;