const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function quickRegistrationofUser(request, response) {
    const requestBody = request.body;
    
    // Initialize database connection
    let dbConnection = await con.createNewDBConnection(constants.NORMAL_SCHOOL);

    // message[0] - response message, message[1] - error code
    const message = await validateResponse(requestBody, dbConnection);
    console.log("message is %s", message[0]);
    console.log("errorcode is %s", message[1]);
    helper.writeMessageResponse(message[0], response, message[1]);
}

async function validateResponse(requestBody, dbConnection) {

    let returnValue = [];

    if (Object.keys(requestBody).length === 0) {
        returnValue = helper.statusCodeResolver(constants.EMPTY_BODY);
        return returnValue;
    }
    else {
        const { email, name, user_type, user_status } = requestBody;

        const QUICK_REGISTRATION_OF_USERS_SQL = queries.QUICK_REGISTRATION_OF_USERS;
        const QUICK_REGISTRATION_OF_USERS_VALUE = [email, name, user_type, user_status];
        dbConnection.query(QUICK_REGISTRATION_OF_USERS_SQL, QUICK_REGISTRATION_OF_USERS_VALUE, function (err) {
            if (err) {
                // console.log(err);
                returnValue = helper.statusCodeResolver(constants.EMAIL_ALREADY_EXISTS);
            }
            else {
                returnValue = helper.statusCodeResolver(constants.EMAIL_SUCCESSFULLY_CREATED);
            }
        });
    }

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue), 1000)
    });

    return promise;
}

module.exports = {
    quickRegistrationofUser,
    validateResponse
};