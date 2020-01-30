const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');

router.post('/api/quickregistration', (request, response) => {
        var requestBody = request.body;
        var responseCode;

        if (Object.keys(request.body).length === 0) {
            responseCode = 500;
            helper.writeResponse(responseCode, response);
        }
        else {
            var email = requestBody.email;
            var name = requestBody.name;
            var user_type = requestBody.user_type;
            var user_status = requestBody.user_status;
            var connection_to = requestBody.connection_to;
            console.log(requestBody);

            con.query("INSERT INTO school.schoolinformation (email, name, user_type, user_status, connection_to) VALUES (?, ?, ?, ?, ?)", [email, name, user_type, user_status, connection_to] , function (err) {
                if (err) {
                    responseCode = 500;
                    helper.writeResponse(responseCode, response, 0);
                }
                else {
                    responseCode = 204;
                    helper.writeResponse(responseCode, response, 0);
                }
            });
        }
})

module.exports = router;