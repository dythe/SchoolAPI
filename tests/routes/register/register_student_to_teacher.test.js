const request = require('supertest');
const app = require('../../../app')
const register_student_to_teacher = require('../../../routes/register/register_student_to_teacher')
const con = require('../../../config/db.js');
const constants = require('../../../utils/constants.js');
const jsonvalues = require('../../../utils/json.js');

describe("Registration of Student to Teacher", () => {
    test("It should register successfully", function (done) {
        request(app)
            .post('/api/register')
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE)
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
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS);
                expect(res.status).toBe(200);
                done();
            });
    });
});