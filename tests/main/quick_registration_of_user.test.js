const request = require('supertest');
const app = require('../../app')
const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');

describe("Quick Registration of User", () => {

    beforeAll(() => {
        helper.setUpAndClearDatabase();
    });

    afterAll((done) => {
        con.con.end();
        con.pool.end();
        done();
    });

});