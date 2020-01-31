// quick_registration_of_user.js
var QUICK_REGISTRATION_OF_USERS = 'INSERT INTO school.schoolinformation (email, name, user_type, user_status) VALUES (?, ?, ?, ?)';

// register_student_to_teacher.js
var REGISTER_STUDENT_TO_MANY_TEACHERS = 'INSERT INTO school.registration_relationship (teacher_email, student_email) VALUES ?';
var REGISTER_TEACHER_TO_MANY_STUDENTS = 'INSERT INTO school.registration_relationship (teacher_email, student_email) VALUES ?';

// retrieve_list_of_students.js
var RETRIEVE_LIST_OF_STUDENTS = 'SELECT student_email FROM school.registration_relationship WHERE teacher_email IN (?)';

// suspend_student.js
var SUSPEND_STUDENT = 'UPDATE school.schoolinformation SET user_status = (?) WHERE email IN (?) AND user_type = (SELECT user_status FROM school.schoolinformation WHERE email = (?) AND user_type = ?);';

// retrieve_for_notification.js
var CHECK_FOR_SUSPENDED_AND_VALID_STUDENT = 'SELECT COUNT(*) as count_value FROM school.schoolinformation WHERE email = ? AND user_status = ?';
var CHECK_TEACHER_STUDENT_REGISTRATION_PAIR = 'SELECT COUNT(*) as count_value2 FROM school.registration_relationship WHERE teacher_email = ? AND student_email = ?';
var RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = 'SELECT student_email FROM school.registration_relationship r INNER JOIN school.schoolinformation db ON r.student_email = db.email WHERE teacher_email IN (?) AND user_status = ?';

module.exports.QUICK_REGISTRATION_OF_USERS = QUICK_REGISTRATION_OF_USERS;
module.exports.REGISTER_STUDENT_TO_MANY_TEACHERS = REGISTER_STUDENT_TO_MANY_TEACHERS;
module.exports.REGISTER_TEACHER_TO_MANY_STUDENTS = REGISTER_TEACHER_TO_MANY_STUDENTS;
module.exports.RETRIEVE_LIST_OF_STUDENTS = RETRIEVE_LIST_OF_STUDENTS;
module.exports.SUSPEND_STUDENT = SUSPEND_STUDENT;
module.exports.CHECK_FOR_SUSPENDED_AND_VALID_STUDENT = CHECK_FOR_SUSPENDED_AND_VALID_STUDENT;
module.exports.CHECK_TEACHER_STUDENT_REGISTRATION_PAIR = CHECK_TEACHER_STUDENT_REGISTRATION_PAIR;
module.exports.RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED = RETRIEVE_STUDENTS_FOR_TEACHER_THAT_IS_NOT_SUSPENDED;