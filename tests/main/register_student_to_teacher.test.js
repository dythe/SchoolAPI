const request = require('supertest');
const app = require('../../app')
const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');

describe("Registration of Student to Teacher", () => {

    beforeAll(() => {
        helper.clearDatabase();
    });

    test("It should return a invalid teacher to student message due to two objects", function (done) {
        request(app)
            .post('/api/register')
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
            .post('/api/register')
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should register successfully", function (done) {
        request(app)
            .post('/api/register')
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_NORMAL)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should not be able to register successfully", function (done) {
        request(app)
            .post('/api/register')
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_NORMAL)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should return an error due to empty body", function (done) {
        request(app)
            .post('/api/register')
            .send(jsonvalues.EMPTY_BODY)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EMPTY_BODY);
                expect(res.status).toBe(200);
                done();
            });
    });

    afterAll((done) => {
        con.con.end();
        con.pool.end();
        done();
    });

});