const con = require('../../config/db.js');
const helper = require('../../utils/helper.js');
const queries = require('../../utils/queries.js');
const constants = require('../../utils/constants.js');

async function registerStudentToTeacher(request, response) {
    const requestBody = request.body;

    const { teacher, students } = requestBody;

    const teacherType = typeof (teacher);
    const studentType = typeof (students);

    // Initialize database connection
    let dbConnection = await con.createNewDBConnection(constants.NORMAL_SCHOOL);
    
    // message[0] - response message, message[1] - error code
    const message = await validateResponse(requestBody, teacher, students, teacherType, studentType, dbConnection);
    console.log("message is %s", message[0]);
    console.log("errorcode is %s", message[1]);
    helper.writeMessageResponse(message[0], response, message[1]);
}

async function validateResponse(requestBody, teacher, students, teacherType, studentType, dbConnection) {
    
    let returnValue = [];

    if (Object.keys(requestBody).length === 0) {
        returnValue = helper.statusCodeResolver(constants.EMPTY_BODY);
        return returnValue;
    }
    else {
        // Check if it is teacher registering to a bunch of students
        // OR student registering to a bunch of teachers
        if (teacherType === constants.STR_VAL && studentType === constants.STR_VAL) {
            returnValue = helper.statusCodeResolver(constants.INVALID_TEACHER_TO_STUDENT_DATA);
        }
        else if (teacherType === constants.OBJ_VAL && studentType === constants.OBJ_VAL) {
            returnValue = helper.statusCodeResolver(constants.INVALID_TEACHER_TO_STUDENT_DATA);
        }
        else if (teacherType === constants.OBJ_VAL && studentType === constants.STR_VAL) {

            const REGISTER_STUDENT_TO_MANY_TEACHERS_SQL = queries.REGISTER_STUDENT_TO_MANY_TEACHERS;
            const REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE = [];

            teacher.forEach(element => {
                REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE.push([element, students]);
            });

            dbConnection.query(REGISTER_STUDENT_TO_MANY_TEACHERS_SQL, [REGISTER_STUDENT_TO_MANY_TEACHERS_VALUE], function (err) {
                if (err) {
                    // console.log(err);
                    let errMessage = helper.errorCodeResolver(err.errno);
                    returnValue = errMessage;
                }
                else {
                    returnValue = helper.statusCodeResolver(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                }
            });
        }
        else if (teacherType === constants.STR_VAL && studentType === constants.OBJ_VAL) {

            const REGISTER_TEACHER_TO_MANY_STUDENTS_SQL = queries.REGISTER_TEACHER_TO_MANY_STUDENTS;
            const REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE = [];

            students.forEach(element => {
                REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE.push([teacher, element]);
            });

            dbConnection.query(REGISTER_TEACHER_TO_MANY_STUDENTS_SQL, [REGISTER_TEACHER_TO_MANY_STUDENTS_VALUE], function (err) {
                if (err) {
                    // console.log(err);
                    let errMessage = helper.errorCodeResolver(err.errno);
                    returnValue = errMessage;
                }
                else {
                    // console.log("success registration %s", constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                    returnValue = helper.statusCodeResolver(constants.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS);
                }
            });
        }
    }
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(returnValue), 1000)
    });

    return promise;

}

module.exports = {
    registerStudentToTeacher,
    validateResponse
};