const response_messages = require('./response_messages.js');

function writeResponse(responseCode, response, customMessage) {

    var responseMessage = response_messages.retrieveResponseMessages(responseCode);

    console.log("responseMessage is %s", responseMessage);    
    console.log("responseCode is %s", responseCode);

    if (customMessage === 0)
        response.write(JSON.stringify({ message: responseMessage }, null, 3));
    
    response.status(responseCode).end();
}

module.exports.writeResponse = writeResponse;