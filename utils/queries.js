var CURRENT_DATABASE = {
    database: 'school',
    get currentDatabase() {
        return database;
    },
    set currentDatabase (name) {
        this.database = name;
    }
}

console.log('CURRENT_DATABASE VALUE IS %s', CURRENT_DATABASE.database);
var SCHOOL_DATABASE = `${CURRENT_DATABASE.database}.school_information`;
var STUDENT_TO_TEACHER_DATABASE = `${CURRENT_DATABASE.database}.student_to_teacher_registration`;

// quick_registration_of_user.js
var QUICK_REGISTRATION_OF_USERS = `INSERT INTO ${SCHOOL_DATABASE} (email, name, user_type, user_status) VALUES (?, ?, ?, ?)`;

// register_student_to_teacher.js
var REGISTER_STUDENT_TO_MANY_TEACHERS = `INSERT INTO ${STUDENT_TO_TEACHER_DATABASE} (teacher_email, student_email) VALUES ?`;
var REGISTER_TEACHER_TO_MANY_STUDENTS = `INSERT INTO ${STUDENT_TO_TEACHER_DATABASE} (teacher_email, student_email) VALUES ?`;

// retrieve_list_of_students.js
var RETRIEVE_LIST_OF_STUDENTS = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email IN (?)`;

// suspend_student.js
var SUSPEND_STUDENT = `UPDATE ${SCHOOL_DATABASE} SET user_status = (?) WHERE email IN (?) AND user_type = (SELECT user_status FROM ${SCHOOL_DATABASE} WHERE email = (?) AND user_type = ?)`;

// retrieve_for_notification.js
var CHECK_FOR_SUSPENDED_AND_VALID_STUDENT = `SELECT COUNT(*) as count_value FROM ${SCHOOL_DATABASE} WHERE email = ? AND user_status = ?`;
var CHECK_TEACHER_STUDENT_REGISTRATION_PAIR = `SELECT COUNT(*) as count_value2 FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email = ? AND student_email = ?`;
var RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} r INNER JOIN ${SCHOOL_DATABASE} db ON r.student_email = db.email WHERE teacher_email IN (?) AND user_status = ?`;

// unit testing
var DELETE_ALL_RECORDS = `DELETE FROM ${STUDENT_TO_TEACHER_DATABASE}`;

module.exports.CURRENT_DATABASE = CURRENT_DATABASE;
module.exports.QUICK_REGISTRATION_OF_USERS = QUICK_REGISTRATION_OF_USERS;
module.exports.REGISTER_STUDENT_TO_MANY_TEACHERS = REGISTER_STUDENT_TO_MANY_TEACHERS;
module.exports.REGISTER_TEACHER_TO_MANY_STUDENTS = REGISTER_TEACHER_TO_MANY_STUDENTS;
module.exports.RETRIEVE_LIST_OF_STUDENTS = RETRIEVE_LIST_OF_STUDENTS;
module.exports.SUSPEND_STUDENT = SUSPEND_STUDENT;
module.exports.CHECK_FOR_SUSPENDED_AND_VALID_STUDENT = CHECK_FOR_SUSPENDED_AND_VALID_STUDENT;
module.exports.CHECK_TEACHER_STUDENT_REGISTRATION_PAIR = CHECK_TEACHER_STUDENT_REGISTRATION_PAIR;
module.exports.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED;
module.exports.DELETE_ALL_RECORDS = DELETE_ALL_RECORDS;