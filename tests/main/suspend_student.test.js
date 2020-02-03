const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const con = require('../../config/db.js');
const axios = require('axios');
const suspend_student = require('../../controllers/update/suspend_student.controllers');

jest.mock('axios');

let dbConnection = "";

describe("Suspending of student", () => {
    beforeAll(async (done) => {
        dbConnection = await con.createNewDBConnection(constants.MOCK_SCHOOL);
        await helper.executeQueryToDatabase([0, 'studentmas@gmail.com'], constants.MOCK_SCHOOL, queries.UPDATE_STUDENT_TO_UNSUSPENDED, dbConnection);
        done();
    });

    it('It should return an error due to empty body', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return suspend_student.validateResponse(req, req.student, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMPTY_BODY, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it('It should not be be able to suspend a student successfully', async (done) => {
        const req = { student: "studentshawn@gmail.com" };
        const resp = helper.createJSON(constants.STUDENT_DOES_NOT_EXISTS);
        axios.get.mockResolvedValue(resp);

        return suspend_student.validateResponse(req, req.student, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.STUDENT_DOES_NOT_EXISTS, constants.CODE_NOT_FOUND]);
                done();
            })
    });

    it('It should be able to suspend a student successfully', async (done) => {
        const req = { student: "studentmas@gmail.com" };
        const resp = helper.createJSON(constants.STUDENT_IS_NOW_SUSPENDED);
        axios.get.mockResolvedValue(resp);

        return suspend_student.validateResponse(req, req.student, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.STUDENT_IS_NOW_SUSPENDED, constants.CODE_SUCCESS]);
                done();
            })
    });

    afterAll(async (done) => {
        dbConnection.end();
        done();
    });
});