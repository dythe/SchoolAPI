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
        helper.clearDatabase();
    });

    test("It should ", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
                expect(res.status).toBe(200);
                done();
            });
    });
});