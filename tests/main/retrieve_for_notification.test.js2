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

    beforeAll(async (done) => {
        await helper.setDatabase();
        await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION);
        const REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentbob@gmail.com']);
        await helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
        done();
    });

    test("It should return the students to be notified that meets the criteria when there are no students mentioned", function (done) {
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

    test("It should return the students that are registered in school database to be notified that meets the criteria when there are students that are mentioned", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS)
            
            .end(function (err, res) {
                if (err) return done(err);
                // console.log(res.body.recipients);
                done();
            });
    });

    test("It should return an error due to empty body", function (done) {
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

});