const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const axios = require('axios');
const register_student_to_teacher = require('../../controllers/register/register_student_to_teacher.controllers');

jest.mock('axios');

let dbConnection = "";

describe("Registration of Student to Teacher", () => {

    beforeAll(async (done) => {
        dbConnection = await con.createNewDBConnection(constants.MOCK_SCHOOL);
        await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION, constants.MOCK_SCHOOL, dbConnection);
        done();
    });

    it('It should return an error due to empty body', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.STR_VAL, constants.STR_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMPTY_BODY, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it('It should return a invalid teacher to student message due to two strings', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING;
        const resp = helper.createJSON(constants.INVALID_TEACHER_TO_STUDENT_DATA);
        axios.get.mockResolvedValue(resp);

        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.STR_VAL, constants.STR_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.INVALID_TEACHER_TO_STUDENT_DATA, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it('It should return a invalid teacher to student message due to two objects', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT;
        const resp = helper.createJSON(constants.INVALID_TEACHER_TO_STUDENT_DATA);
        axios.get.mockResolvedValue(resp);

        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.OBJ_VAL, constants.OBJ_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.INVALID_TEACHER_TO_STUDENT_DATA, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it('It should register successfully one-teacher-to-many-students', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS;
        const resp = helper.createJSON(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.STR_VAL, constants.OBJ_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, constants.CODE_SUCCESS]);
                done();
            })
    });

    it('It should not register successfully one-teacher-to-many-students', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS;
        const resp = helper.createJSON(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.STR_VAL, constants.OBJ_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS, constants.CODE_ALREADY_EXISTS]);
                done();
            })
    });

    it('It should register successfully one-student-to-many-teachers', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS;
        const resp = helper.createJSON(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.OBJ_VAL, constants.STR_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, constants.CODE_SUCCESS]);
                done();
            })
    });

    it('It should not register successfully one-student-to-many-teachers', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS;
        const resp = helper.createJSON(constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.OBJ_VAL, constants.STR_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS, constants.CODE_ALREADY_EXISTS]);
                done();
            })
    });

    it('It should return an error as student/teacher does not exist - one teacher to many students', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID;
        const resp = helper.createJSON(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.STR_VAL, constants.OBJ_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST, constants.CODE_NOT_FOUND]);
                done();
            })
    });

    it('It should return an error as student/teacher does not exist - one student to many teachers', async (done) => {
        const req = jsonvalues.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID;
        const resp = helper.createJSON(constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST);
        axios.get.mockResolvedValue(resp);
        return register_student_to_teacher.validateResponse(req, req.teacher, req.students, constants.OBJ_VAL, constants.STR_VAL, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST, constants.CODE_NOT_FOUND]);
                done();
            })
    });

    afterAll(async (done) => {
        dbConnection.end();
        done();
    });
});