const response_messages = require('./response_messages.js');

function writeResponse(responseCode, response, customMessage) {

    var responseMessage = response_messages.retrieveResponseMessages(responseCode);

    console.log("responseMessage is %s", responseMessage);    
    console.log("responseCode is %s", responseCode);

    if (customMessage === 0)
        response.write(JSON.stringify({ message: responseMessage }, null, 3));
    
    response.status(responseCode).end();
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
            // email += emailsArray[i];\
        }
    }
    return emailsList;
}

module.exports.writeResponse = writeResponse;
module.exports.findEmailAddresses = findEmailAddresses;