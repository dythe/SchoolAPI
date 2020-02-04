const SCHOOL_DATABASE = `school_information`;
const STUDENT_TO_TEACHER_DATABASE = `student_to_teacher_registration`;

// quick_registration_of_user.js
const QUICK_REGISTRATION_OF_USERS = `INSERT INTO ${SCHOOL_DATABASE} (email, name, user_type, user_status) VALUES (?, ?, ?, ?)`;

// register_student_to_teacher.js
const REGISTER_STUDENT_TO_MANY_TEACHERS = `INSERT INTO ${STUDENT_TO_TEACHER_DATABASE} (teacher_email, student_email) VALUES ?`;
const REGISTER_TEACHER_TO_MANY_STUDENTS = `INSERT INTO ${STUDENT_TO_TEACHER_DATABASE} (teacher_email, student_email) VALUES ?`;

// retrieve_list_of_students.js
const RETRIEVE_LIST_OF_STUDENTS_SINGLE = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email IN (?)`;
const RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_1 = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email NOT IN (?)`;
const RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_2 = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email NOT IN (?)`;

// suspend_student.js
const SUSPEND_STUDENT = `UPDATE ${SCHOOL_DATABASE} SET user_status = (?) WHERE email IN (?) AND user_type = (SELECT user_status FROM ${SCHOOL_DATABASE} WHERE email = (?) AND user_type = ?)`;
const UPDATE_STUDENT_TO_UNSUSPENDED = `UPDATE ${SCHOOL_DATABASE} SET user_status = (?) WHERE email IN (?)`;

// retrieve_for_notification.js
const CHECK_FOR_SUSPENDED_STUDENT_SQL = `SELECT COUNT(*) as count_value, email FROM ${SCHOOL_DATABASE} WHERE email IN (?) AND user_status = ? GROUP BY email`;
// const CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL = `SELECT COUNT(*) as count_value FROM ${STUDENT_TO_TEACHER_DATABASE} WHERE teacher_email = ? AND student_email IN (?) GROUP BY student_email`;
const RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = `SELECT student_email FROM ${STUDENT_TO_TEACHER_DATABASE} r INNER JOIN ${SCHOOL_DATABASE} db ON r.student_email = db.email WHERE teacher_email IN (?) AND user_status = ?`;
const CHECK_FOR_VALID_STUDENT_SQL = `SELECT COUNT(*) as count_value, email FROM ${SCHOOL_DATABASE} WHERE email IN (?) GROUP BY email`;

// unit testing
const DELETE_ALL_RECORDS_FROM_STUDENT_TO_TEACHER = `DELETE FROM ${STUDENT_TO_TEACHER_DATABASE}`;
const DELETE_ALL_RECORDS_STUDENT_INFORMATION = `DELETE FROM ${SCHOOL_DATABASE}`;
const DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS = `DELETE FROM ${SCHOOL_DATABASE} WHERE email = ?`;

module.exports.QUICK_REGISTRATION_OF_USERS = QUICK_REGISTRATION_OF_USERS;
module.exports.DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS = DELETE_FROM_SCHOOL_DATABASE_WHERE_USER_IS;
module.exports.REGISTER_STUDENT_TO_MANY_TEACHERS = REGISTER_STUDENT_TO_MANY_TEACHERS;
module.exports.REGISTER_TEACHER_TO_MANY_STUDENTS = REGISTER_TEACHER_TO_MANY_STUDENTS;
module.exports.RETRIEVE_LIST_OF_STUDENTS_SINGLE = RETRIEVE_LIST_OF_STUDENTS_SINGLE;
module.exports.CHECK_FOR_VALID_STUDENT_SQL = CHECK_FOR_VALID_STUDENT_SQL;
module.exports.SUSPEND_STUDENT = SUSPEND_STUDENT;
module.exports.UPDATE_STUDENT_TO_UNSUSPENDED = UPDATE_STUDENT_TO_UNSUSPENDED;
module.exports.CHECK_FOR_SUSPENDED_STUDENT_SQL = CHECK_FOR_SUSPENDED_STUDENT_SQL;
// module.exports.CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL = CHECK_TEACHER_STUDENT_REGISTRATION_PAIR_SQL;
module.exports.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED;
module.exports.DELETE_ALL_RECORDS_FROM_STUDENT_TO_TEACHER = DELETE_ALL_RECORDS_FROM_STUDENT_TO_TEACHER;
module.exports.DELETE_ALL_RECORDS_STUDENT_INFORMATION = DELETE_ALL_RECORDS_STUDENT_INFORMATION;
module.exports.RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_1 = RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_1;
module.exports.RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_1 = RETRIEVE_LIST_OF_STUDENTS_MULTIPLE_2;
