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

    test("It should return a invalid teacher to student message due to two objects", function (done) {
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

    test("It should return a invalid teacher to student message due to two strings", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
                expect(res.status).toBe(200);
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

    test("It should return an error as student/teacher does not exist - one teacher to many students", function (done) {
        request(app)
            .post(constants.REGISTER_STUDENT_TO_TEACHER_API_URL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should return an error as student/teacher does not exist - one student to many teachers", function (done) {
        request(app)
            .post(constants.REGISTER_STUDENT_TO_TEACHER_API_URL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
                expect(res.status).toBe(200);
                done();
            });
    });
});