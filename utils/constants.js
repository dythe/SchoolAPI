const GENERIC_ERROR = 'Generic error, please contact us for assistance.';
const TEACHER_DATA_NOT_REQUESTED = 'There were no teacher data requested, please try again!';
const EMAIL_ALREADY_EXISTS = 'This email address has already been registered!';
const EMAIL_SUCCESSFULLY_CREATED = 'This email address has been successfully created!';
const INVALID_TEACHER_TO_STUDENT_DATA = 'Invalid student to teacher value, please check your input.';
const ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS = 'One or more student-teacher registration pair already exists.';
const STUDENT_TO_TEACHER_REGISTRATION_SUCCESS = 'The student and teacher registration is successful!';
const STUDENT_DOES_NOT_EXISTS = 'The student does not exists, he/she is not a student or is already suspended!';
const STUDENT_IS_NOW_SUSPENDED = 'The student is now suspended!';
const EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST = 'Either the student or teacher does not exist!';

const EMPTY_BODY = 'There was no data sent.';

// sql state
const DUPLICATE_ENTRY = 1062;
const FOREIGN_KEY_CONSTRAINT = 1452; // does not exist

// Databases
const MOCK_SCHOOL = 'mock_school';
const NORMAL_SCHOOL = 'school';

const SCHOOL_INFORMATION = 'school_information';
const STUDENT_TO_TEACHER_REGISTRATION = 'student_to_teacher_registration';

// API URLs
const QUICK_REGISTRATION_API_URL = '/api/quickregistration';
const REGISTER_STUDENT_TO_TEACHER_API_URL = '/api/register';
const RETRIEVE_FOR_NOTIFICATION_API_URL = '/api/retrievefornotifications';
const RETRIEVE_LIST_OF_STUDENTS_API_URL = '/api/commonstudents';
const SUSPEND_STUDENT_API_URL = '/api/suspend';

module.exports.EMPTY_BODY = EMPTY_BODY;
module.exports.TEACHER_DATA_NOT_REQUESTED = TEACHER_DATA_NOT_REQUESTED;
module.exports.SCHOOL_INFORMATION = SCHOOL_INFORMATION;
module.exports.STUDENT_TO_TEACHER_REGISTRATION = STUDENT_TO_TEACHER_REGISTRATION;

module.exports.GENERIC_ERROR = GENERIC_ERROR;
module.exports.EMAIL_ALREADY_EXISTS = EMAIL_ALREADY_EXISTS;
module.exports.EMAIL_SUCCESSFULLY_CREATED = EMAIL_SUCCESSFULLY_CREATED;
module.exports.INVALID_TEACHER_TO_STUDENT_DATA = INVALID_TEACHER_TO_STUDENT_DATA;
module.exports.ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS = ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS;
module.exports.STUDENT_TO_TEACHER_REGISTRATION_SUCCESS = STUDENT_TO_TEACHER_REGISTRATION_SUCCESS;
module.exports.STUDENT_DOES_NOT_EXISTS = STUDENT_DOES_NOT_EXISTS;
module.exports.STUDENT_IS_NOW_SUSPENDED = STUDENT_IS_NOW_SUSPENDED;
module.exports.EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST = EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST;

module.exports.MOCK_SCHOOL = MOCK_SCHOOL;
module.exports.NORMAL_SCHOOL = NORMAL_SCHOOL;

module.exports.DUPLICATE_ENTRY = DUPLICATE_ENTRY;
module.exports.FOREIGN_KEY_CONSTRAINT = FOREIGN_KEY_CONSTRAINT;

module.exports.QUICK_REGISTRATION_API_URL = QUICK_REGISTRATION_API_URL;
module.exports.REGISTER_STUDENT_TO_TEACHER_API_URL = REGISTER_STUDENT_TO_TEACHER_API_URL;
module.exports.RETRIEVE_FOR_NOTIFICATION_API_URL = RETRIEVE_FOR_NOTIFICATION_API_URL;
module.exports.RETRIEVE_LIST_OF_STUDENTS_API_URL = RETRIEVE_LIST_OF_STUDENTS_API_URL;
module.exports.SUSPEND_STUDENT_API_URL = SUSPEND_STUDENT_API_URL;