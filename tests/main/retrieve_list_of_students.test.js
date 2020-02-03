const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const axios = require('axios');
const retrieve_list_of_students = require('../../controllers/retrieve/retrieve_list_of_students.controllers');

jest.mock('axios');
jest.setTimeout(100000);

let dbConnection = "";

describe("Retrieve list of students for under teacher", () => {
    beforeAll(async (done) => {
        
        dbConnection = await con.createNewDBConnection(constants.MOCK_SCHOOL);
        await helper.clearDatabase(constants.STUDENT_TO_TEACHER_REGISTRATION, constants.MOCK_SCHOOL, dbConnection);

        var REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentagnes@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studenthon@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherken@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherpauline@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherjoe@gmail.com', 'studentamy@gmail.com']);
        REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push(['teacherjoe@gmail.com', 'studenthon@gmail.com']);
        await helper.insertDatabase([REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], constants.MOCK_SCHOOL, dbConnection);

        done();
    });

    it('It should return an error due to no parameters', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return retrieve_list_of_students.validateResponse(req, null, null, resp, req, dbConnection)
            .then(data => {
                expect(data).toBe(constants.EMPTY_PARAMETERS);
                done();
            })
    });

    it('It should retrieve students that the teachers have in common', async (done) => {
        const req = ['teacherken@gmail.com', 'teacherpauline@gmail.com', 'teacherjoe@gmail.com'];
        const resp = { students: ['studentamy@gmail.com'] };
        axios.get.mockResolvedValue(resp);

        return retrieve_list_of_students.validateResponse(req, constants.OBJ_VAL, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual(resp);
                done();
            })
    });

    it('It should retrieve students that a teacher have', async (done) => {
        const req = 'teacherken@gmail.com';
        const resp = { students: ['studentagnes@gmail.com', 'studentamy@gmail.com', 'studenthon@gmail.com'] };
        axios.get.mockResolvedValue(resp);

        return retrieve_list_of_students.validateResponse(req, constants.STR_VAL, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual(resp);
                done();
            })
    });

    it('It should not have retrieved any students as there are no students in commmon', async (done) => {
        const req = ['teacherken@gmail.com', 'teacherpauline@gmail.com', 'teacherjoe@gmail.com', 'teacherannie@gmail.com'];
        const resp = { students: [] };
        axios.get.mockResolvedValue(resp);

        return retrieve_list_of_students.validateResponse(req, constants.OBJ_VAL, resp, dbConnection)
            .then(data => {
                expect(data).toStrictEqual(resp);
                done();
            })
    });
    // afterAll(async (done) => {
    //     dbConnection.end();
    //     dbConnection.close();
    //     done();
    // });
});