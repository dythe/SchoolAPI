const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function registerStudentToTeacher(request, response) {

    // console.log(request);
    // console.log(response);
    const requestBody = request.body;
    const teacher = requestBody.teacher;
    const students = requestBody.students;

    const teacherType = typeof (teacher);
    const studentType = typeof (students);

    var message = await validateResponse(requestBody, teacher, students, teacherType, studentType);
    // console.log("teacherType: %s", teacherType);
    // console.log("studentType: %s", studentType);
    console.log("message is %s", message);
    helper.writeMessageResponse(message, response);
}

async function validateResponse(requestBody, teacher, students, teacherType, studentType) {
    
    let returnValue = "";

    if (Object.keys(requestBody).length === 0) {
        console.log("empty body");
        returnValue = constants.EMPTY_BODY
        return returnValue;
        // helper.writeMessageResponse(constants.EMPTY_BODY, response);
    }
    else {
        // Check if it is teacher registering to a bunch of students
        // OR student registering to a bunch of teachers
        if (teacherType === "string" && studentType === "string") {
            returnValue = constants.INVALID_TEACHER_TO_STUDENT_DATA
            return returnValue;
            // helper.writeMessageResponse(constants.INVALID_TEACHER_TO_STUDENT_DATA, response);
        }
        else if (teacherType === "object" && studentType === "object") {
            returnValue = constants.INVALID_TEACHER_TO_STUDENT_DATA
            return returnValue;
            // helper.writeMessageResponse(constants.INVALID_TEACHER_TO_STUDENT_DATA, response);
        }
        else if (teacherType === "object" && studentType === "string") {

            const REGISTER_STUDENT_TO_MANY_TEACHERS_SQL = queries.REGISTER_STUDENT_TO_MANY_TEACHERS;
            const REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];

            teacher.forEach(element => {
                REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push([element, students]);
            });

            con.query(REGISTER_STUDENT_TO_MANY_TEACHERS_SQL, [REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], function (err) {
                if (err) {
                    console.log(err);
                    let errMessage = helper.errorCodeResolver(err.errno);
                    returnValue = errMessage;
                    return returnValue;
                }
                else {
                    returnValue = constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS
                    return returnValue;
                    // helper.writeMessageResponse(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, response);
                }
            });
        }
        else if (teacherType === "string" && studentType === "object") {

            const REGISTER_TEACHER_TO_MANY_STUDENTS_SQL = queries.REGISTER_TEACHER_TO_MANY_STUDENTS;
            const REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE = [];

            students.forEach(element => {
                REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE.push([teacher, element]);
            });

            // console.log(REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE);
            con.query(REGISTER_TEACHER_TO_MANY_STUDENTS_SQL, [REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE], function (err) {
                if (err) {
                    console.log(err);
                    let errMessage = helper.errorCodeResolver(err.errno);
                    returnValue = errMessage;
                    return returnValue;
                }
                else {
                    console.log("success registration %s", constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                    returnValue = constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS
                    return returnValue;
                    // helper.writeMessageResponse(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS, response);
                }
            });
        }

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(returnValue), 1000)
        });

        return promise;
    }

}

module.exports.registerStudentToTeacher = registerStudentToTeacher;
module.exports.validateResponse = validateResponse;