function retrieveResponseMessages(responseCode) {
    
    console.log("retrieveResponseMessages");
    var message;

    switch(responseCode) {
        case 200:
            message = "Response 200";
            break;
        case 204:
            message = "Response 204";
            break;     
        case 400:
            message = "Response 400";
            break;
        case 404:
            message = "Response 404";
            break;
        case 500:
            message = "Response 500";
            break;
        default:            
            message = "Response None";
            break;
    }

    console.log("message is %s", message);
    return message;
}

module.exports.retrieveResponseMessages = retrieveResponseMessages;