function retrieveResponseMessages(responseCode) {
    
    console.log("retrieveResponseMessages");
    var message;

    switch(responseCode) {
        case 200:
            message = "Response 200 OK";
            break;
        case 204:
            message = "Response 204 No Content";
            break;     
        case 400:
            message = "Response 400 Bad Request";
            break;
        case 404:
            message = "Response 404 Not Found";
            break;
        case 500:
            message = "Response 500 Internal Server Error";
            break;
    }

    console.log("message is %s", message);
    return message;
}

module.exports.retrieveResponseMessages = retrieveResponseMessages;