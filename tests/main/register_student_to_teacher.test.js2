const request = require('supertest');
const app = require('../../app')
const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const apiURL = constants.REGISTER_STUDENT_TO_TEACHER_API_URL;

describe("Registration of Student to Teacher - Invalid cases", () => {

    beforeAll(async (done) => {
        // await helper.setDatabase();
        await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION);
        var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        // REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherannie@gmail.com', 'studentshawn@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherannie@gmail.com', 'studentmas@gmail.com']);
        await helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
        done();
    });

//     test("It should return a invalid teacher to student message due to two objects", function (done) {
//         request(app)
//             .post(apiURL)
//             .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
//                 expect(res.status).toBe(200);
//                 done();
//             });
//     });

//     test("It should return a invalid teacher to student message due to two strings", function (done) {
//         request(app)
//             .post(apiURL)
//             .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 expect(res.body.message).toBe(constants.INVALID_TEACHER_TO_STUDENT_DATA);
//                 expect(res.status).toBe(200);
//                 done();
//             });
//     });

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
    }, 30000);

//     test("It should return an error as student/teacher does not exist - one teacher to many students", function (done) {
//         request(app)
//             .post(apiURL)
//             .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 expect(res.body.message).toBe(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
//                 expect(res.status).toBe(200);
//                 done();
//             });
//     });

//     test("It should return an error as student/teacher does not exist - one student to many teachers", function (done) {
//         request(app)
//             .post(apiURL)
//             .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 expect(res.body.message).toBe(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
//                 expect(res.status).toBe(200);
//                 done();
//             });
//     });

    // test("It should not register successfully as this student to teacher registration already exists", function (done) {
    //     request(app)
    //         .post(apiURL)
    //         .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID)
    //         .end(function (err, res) {
    //             if (err) return done(err);
    //             expect(res.body.message).toBe(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS);
    //             expect(res.status).toBe(200);
    //             done();
    //         });
    // });
});

describe("Registration of Student to Teacher - student-teacher and teacher-student", () => {

    // beforeEach(() => {
    //     helper.setDatabase();
    // });

    // beforeAll(async (done) => {
    //     await helper.setDatabase();
    //     await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION);
    //     var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
    //     REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherannie@gmail.com', 'studentmiche@gmail.com']);
    //     REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherannie@gmail.com', 'studentmas@gmail.com']);
    //     await helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
    //     done();
    // });

    test("It should register successfully one-student-to-many-teachers", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should register successfully one-teacher-to-many-students", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                expect(res.status).toBe(200);
                done();
            });
    });
});