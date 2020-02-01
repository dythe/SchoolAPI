const request = require('supertest');
const app = require('../../app')
const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const apiURL = constants.RETRIEVE_FOR_NOTIFICATION_API_URL;

describe("Retrieve students for notification", () => {

    beforeEach(() => {
        helper.setDatabase();
    });

    beforeAll(() => {
        helper.setDatabase();
        var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentbob@gmail.com']);
        helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
    });

    test("It should ", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL)
            .end(function (err, res) {
                if (err) return done(err);
                // expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
                expect(res.status).toBe(200);
                done();
            });
    });
});