const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const axios = require('axios');
const retrieve_list_of_students = require('../../controllers/retrieve/retrieve_list_of_students.controllers');

jest.mock('axios');
jest.setTimeout(100000);

describe("Retrieve list of students for under teacher", () => {
    beforeAll(async (done) => {
        helper.setDatabase();
        helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION);
        var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentagnes@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studenthon@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherpauline@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherjoe@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherjoe@gmail.com', 'studenthon@gmail.com']);
        helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE]);
        done();
    });

    it('It should return an error due to no parameters', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return retrieve_list_of_students.validateResponse(req, null, null, resp, req)
            .then(data => {
                expect(data).toBe(constants.EMPTY_BODY);
                done();
            })
    });

    //place holder
    // it('It should return the students that are registered in school database to be notified that meets the criteria when there are students that are mentioned', async (done) => {
    //     // 
    //     const req = jsonvalues.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS;
    //     const resp = jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION;
    //     axios.get.mockResolvedValue(resp);

    //     return retrieve_for_notification.validateResponse(req, req.teacher, req.notification)
    //         .then(data => {
    //             expect(data.recipients).toStrictEqual(jsonvalues.EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION);
    //             done();
    //         })
    // });

    // afterAll(async (done) => {
    //     con.pool.end();
    //     con.end();
    //     done();
    // });
});