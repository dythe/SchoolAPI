const request = require('supertest');
const app = require('../../app')
const constants = require('../../utils/constants.js');
const jsonvalues = require('../../utils/json.js');
const helper = require('../../utils/helper.js');
const con = require('../../config/db.js');
const apiURL = constants.QUICK_REGISTRATION_API_URL;

describe("Quick Registration of User", () => {

    beforeEach(() => {
        helper.setDatabase();
        helper.deleteFromDatabase('studentgiga@gmail.com');
    });

    test("Email should be created successfully", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.QUICK_REGISTRATION_GIGA)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EMAIL_SUCCESSFULLY_CREATED);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("Email should not be created as it already exists", function (done) {
        request(app)
            .post(apiURL)
            .send(jsonvalues.QUICK_REGISTRATION_BOB)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EMAIL_ALREADY_EXISTS);
                expect(res.status).toBe(200);
                done();
            });
    });

    test("It should return an error due to empty body", function (done) {
        request(app)
            .post(constants.QUICK_REGISTRATION_API_URL)
            .send(jsonvalues.EMPTY_BODY)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).toBe(constants.EMPTY_BODY);
                expect(res.status).toBe(200);
                done();
            });
    });
    
    afterAll((done) => {
        con.con.end();
        con.pool.end();
        done();
    });

});