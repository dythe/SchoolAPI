const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const con = require('../../config/db.js');
const axios = require('axios');
const retrieve_for_notification = require('../../controllers/retrieve/retrieve_for_notification.controllers');

jest.mock('axios');
jest.setTimeout(100000);

let dbConnection = "";

describe("Retrieve list of students for notification", () => {
    beforeAll(async (done) => {
        dbConnection = await con.createNewDBConnection(constants.MOCK_SCHOOL);
        await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION, constants.MOCK_SCHOOL, dbConnection);
        const REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentbob@gmail.com']);
        await helper.executeQueryToDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], constants.MOCK_SCHOOL, queries.REGISTER_STUDENT_TO_MANY_TEACHERS, dbConnection);
        done();
    });

    it('It should return an error due to empty body', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMPTY_BODY, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it('It should return the students that are registered in school database to be notified that meets the criteria when there are students that are mentioned', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS;
        const resp = jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data[0].recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
                expect(data[1]).toStrictEqual(constants.CODE_SUCCESS);
                done();
            })
    });

    it('It should return the students to be notified that meets the criteria when there are no students mentioned', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS;
        const resp = jsonvalues.EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data[0].recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
                expect(data[1]).toStrictEqual(constants.CODE_SUCCESS);
                done();
            })
    });

    it('It should return no recipients found in an empty array as it is a invalid teacher with no students mentioned in notification', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS_INVALID_TEACHER;
        const resp = jsonvalues.EMPTY_ARRAY;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data[0].recipients).toStrictEqual(jsonvalues.EMPTY_ARRAY);
                expect(data[1]).toStrictEqual(constants.CODE_NOT_FOUND);
                done();
            })
    });

    it('It should return no recipients found in an empty array as it is a invalid teacher with students mentioned in notification', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_TEACHER;
        const resp = jsonvalues.EMPTY_ARRAY;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data[0].recipients).toStrictEqual(jsonvalues.EMPTY_ARRAY);
                expect(data[1]).toStrictEqual(constants.CODE_NOT_FOUND);
                done();
            })
    });

    it('It should return the students that are registered in school database to be notified which are mentioned but not the invalid student', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_STUDENT;
        const resp = jsonvalues.EXPECTED_RESULT_6_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification, dbConnection)
            .then(data => {
                expect(data[0].recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_6_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
                expect(data[1]).toStrictEqual(constants.CODE_SUCCESS);
                done();
            })
    });

    afterAll(async (done) => {
        dbConnection.end();
        done();
    });
});