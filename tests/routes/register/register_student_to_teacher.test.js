const request = require('supertest');
const app = require('../../../app')
const register_student_to_teacher = require('../../../routes/register/register_student_to_teacher')
const con = require('../../../config/db.js');

describe('Registration of Student to Teacher', () => {
    beforeAll(() => {
        con.connect();
    });

    describe("GET / ", () => {
        test("It should respond with a message", async () => {
            const body = {
                students: "studentjon@gmail.com",
                teacher:
                [
                    "teacherjoe@gmail.com",
                    "teacherken@gmail.com"
                ]
            }
            const response = await (request(register_student_to_teacher).post("/api/register").send(body));
            
            expect(response.status).toBe(200);
        });
    });
})