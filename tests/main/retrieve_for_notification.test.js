const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const axios = require('axios');
const retrieve_for_notification = require('../../controllers/retrieve/retrieve_for_notification.controllers');

jest.mock('axios');

describe("Retrieve list of students for notification", () => {
    beforeAll(async (done) => {
        helper.setDatabase();
        helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION);
        const REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentbob@gmail.com']);
        helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
        done();
    });

    it('It should return an error due to empty body', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, null, null)
            .then(data => {
                expect(data).toBe(constants.EMPTY_BODY);
                done();
            })
    });

    it('It should return the students to be notified that meets the criteria when there are no students mentioned', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS;
        const resp = jsonvalues.EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification)
            .then(data => {
                expect(data.recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
                done();
            })
    });

    it('It should return the students that are registered in school database to be notified that meets the criteria when there are students that are mentioned', async (done) => {
        const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS;
        const resp = jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
        axios.get.mockResolvedValue(resp);

        return retrieve_for_notification.validateResponse(req, req.teacher, req.notification)
            .then(data => {
                expect(data.recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
                done();
            })
    });
});