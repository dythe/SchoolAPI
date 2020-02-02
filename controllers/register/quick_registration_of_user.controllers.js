const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

function quickRegistrationofUser(request, response) {
    const requestBody = request.body;

    if (Object.keys(request.body).length === 0) {
        helper.writeMessageResponse(constants.EMPTY_BODY, response);
    }
    else {
        const email = requestBody.email;
        const name = requestBody.name;
        const user_type = requestBody.user_type;
        const user_status = requestBody.user_status;
        // console.log(requestBody);

        const QUICK_REGISTRATION_OF_USERS_SQL = queries.QUICK_REGISTRATION_OF_USERS;
        const QUICK_REGISTRATION_OF_USERS_VALUE = [email, name, user_type, user_status];
        con.query(QUICK_REGISTRATION_OF_USERS_SQL, QUICK_REGISTRATION_OF_USERS_VALUE, function (err) {
            if (err) {
                // console.log(err);
                helper.writeMessageResponse(constants.EMAIL_ALREADY_EXISTS, response);
            }
            else {
                helper.writeMessageResponse(constants.EMAIL_SUCCESSFULLY_CREATED, response);
            }
        });
    }
}

module.exports.quickRegistrationofUser = quickRegistrationofUser;