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
        helper.clearDatabase();
        var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentagnes@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studenthon@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentmiche@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherpauline@gmail.com', 'studentagnes@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherpauline@gmail.com', 'studenthon@gmail.com']);
        helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
    });

    test("It should return an error due to no parameter", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.EMPTY_BODY)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EMPTY_BODY);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should retrieve students that both teacher have in common", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_FOR_TEST_CASE_3);
                expect(res.status).toBe(200);
                done();
            });
    });
});