const response_messages = require('./response_messages.js');
const con = require('../config/db.js');

function writeResponse(responseCode, response, customMessage) {
    var responseMessage = response_messages.retrieveResponseMessages(responseCode);

    console.log("responseMessage is %s", responseMessage);
    console.log("responseCode is %s", responseCode);
    console.log("response is %s", response);

    // customMessage == 0 - not a custom message
    // customMessage == 1 - custom message
    if (customMessage === 0)
        response.write(JSON.stringify({ message: responseMessage }, null, 3));

    response.status(responseCode);
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
    console.log('addRecipients currentValue %s', currentValue);
    console.log('addRecipients retrieveValues %s', retrieveValues);
    if (!retrieveValues.recipients.includes(currentValue)) {
        retrieveValues.recipients.push(currentValue);
    }
}

function addStudents(currentValue, retrieveValues) {
    console.log('addStudents currentValue %s', currentValue);
    console.log('addStudents retrieveValues %s', retrieveValues);
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


module.exports.writeResponse = writeResponse;
module.exports.findEmailAddresses = findEmailAddresses;
module.exports.addRecipients = addRecipients;
module.exports.addStudents = addStudents;
module.exports.getResult = getResult;