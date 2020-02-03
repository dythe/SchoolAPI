const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const axios = require('axios');
const quick_registration_of_user = require('../../controllers/register/quick_registration_of_user.controllers');

jest.mock('axios');

let dbConnection = "";

describe("Quick Registration of User", () => {

    beforeAll(async (done) => {
        dbConnection = await con.createNewDBConnection(constants.MOCK_SCHOOL);
        await helper.deleteFromDatabase('studentgiga@gmail.com', constants.MOCK_SCHOOL, dbConnection);
        done();
    });

    it('It should return an error due to empty body', async (done) => {
        const req = jsonvalues.EMPTY_BODY;
        const resp = helper.createJSON(constants.EMPTY_BODY);
        axios.get.mockResolvedValue(resp);

        return quick_registration_of_user.validateResponse(req, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMPTY_BODY, constants.CODE_BAD_REQUEST]);
                done();
            })
    });

    it("Email should be created successfully", function (done) {
        const req = jsonvalues.REQUEST_VALUE_2_FOR_TEST_CASE_QUICK_REGISTRATION;
        const resp = helper.createJSON(constants.EMAIL_SUCCESSFULLY_CREATED);
        axios.get.mockResolvedValue(resp);

        return quick_registration_of_user.validateResponse(req, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMAIL_SUCCESSFULLY_CREATED, constants.CODE_SUCCESS]);
                done();
            })
    });

    it("Email should not be created as it already exists", function (done) {
        const req = jsonvalues.REQUEST_VALUE_3_FOR_TEST_CASE_QUICK_REGISTRATION;
        const resp = helper.createJSON(constants.EMAIL_ALREADY_EXISTS);
        axios.get.mockResolvedValue(resp);

        return quick_registration_of_user.validateResponse(req, dbConnection)
            .then(data => {
                expect(data).toStrictEqual([constants.EMAIL_ALREADY_EXISTS, constants.CODE_ALREADY_EXISTS]);
                done();
            })
    });

    afterAll(async (done) => {
        dbConnection.end();
        done();
    });
});