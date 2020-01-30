const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const con = require('../../config/db.js');

router.post('/api/quickregistration', (request, response) => {
    var requestBody = request.body;

    if (Object.keys(request.body).length === 0) {
        response.write("An error has encountered").status(500).end();
    }
    else {
        var email = requestBody.email;
        var name = requestBody.name;
        var user_type = requestBody.user_type;
        var user_status = requestBody.user_status;
        var connection_to = requestBody.connection_to;
        console.log(requestBody);

        con.query("INSERT INTO school.schoolinformation (email, name, user_type, user_status, connection_to) VALUES (?, ?, ?, ?, ?)",
        [email, name, user_type, user_status, connection_to] , function (err) {
            if (err) {
                response.status(500).end();
                console.log(err)
            }
            else {
                response.status(200).end();
            }
        });
    }
    
})

module.exports = router;