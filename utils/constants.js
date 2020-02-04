const GENERIC_ERROR = 'Generic error, please contact us for assistance.';
const TEACHER_DATA_NOT_REQUESTED = 'There were no teacher data requested, please try again!';
const EMAIL_ALREADY_EXISTS = 'This email address has already been registered!';
const EMAIL_SUCCESSFULLY_CREATED = 'This email address has been successfully created!';
const INVALID_TEACHER_TO_STUDENT_DATA = 'Invalid student to teacher value, please check your input.';
const ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS = 'One or more student-teacher registration pair already exists.';
const STUDENT_TO_TEACHER_REGISTRATION_SUCCESS = 'The student and teacher registration is successful!';
const STUDENT_DOES_NOT_EXISTS = 'The student is not a student or is already suspended!';
const STUDENT_IS_NOW_SUSPENDED = 'The student is now suspended!';
const EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST = 'Either the student or teacher does not exist!';

const EMPTY_BODY = 'There was no data sent.';
const EMPTY_PARAMETERS = 'There were no parameters sent.';

// api response status code
const CODE_SUCCESS = 200;
const CODE_NO_CONTENT = 204;
const CODE_BAD_REQUEST = 400;
const CODE_NOT_FOUND = 404;
const CODE_ALREADY_EXISTS = 409;
const CODE_INTERNAL_SERVER_ERROR = 500;

// sql state
const DUPLICATE_ENTRY = 1062;
const EMPTY_QUERY = 1065;
const FOREIGN_KEY_CONSTRAINT = 1452; // does not exist

// Databases
const MOCK_SCHOOL = 'mock_school';
const NORMAL_SCHOOL = 'school';

// const/let/var type
const STR_VAL = 'string';
const OBJ_VAL = 'object';

const SCHOOL_INFORMATION = 'school_information';
const STUDENT_TO_TEACHER_REGISTRATION = 'student_to_teacher_registration';

// API URLs
const QUICK_REGISTRATION_API_URL = '/api/quickregistration';
const REGISTER_STUDENT_TO_TEACHER_API_URL = '/api/register';
const RETRIEVE_FOR_NOTIFICATION_API_URL = '/api/retrievefornotifications';
const RETRIEVE_LIST_OF_STUDENTS_API_URL = '/api/commonstudents';
const SUSPEND_STUDENT_API_URL = '/api/suspend';

module.exports = {
    QUICK_REGISTRATION_API_URL,
    REGISTER_STUDENT_TO_TEACHER_API_URL,
    RETRIEVE_FOR_NOTIFICATION_API_URL,
    RETRIEVE_LIST_OF_STUDENTS_API_URL,
    SUSPEND_STUDENT_API_URL,

    DUPLICATE_ENTRY,
    FOREIGN_KEY_CONSTRAINT,
    EMPTY_QUERY,

    MOCK_SCHOOL,
    NORMAL_SCHOOL,

    GENERIC_ERROR,
    EMAIL_ALREADY_EXISTS,
    EMAIL_SUCCESSFULLY_CREATED,
    INVALID_TEACHER_TO_STUDENT_DATA,
    ONE_OR_MORE_STUDENT_TEACHER_REGISTRATION_PAIR_EXISTS,
    STUDENT_TO_TEACHER_REGISTRATION_SUCCESS,
    STUDENT_DOES_NOT_EXISTS,
    STUDENT_IS_NOW_SUSPENDED,
    EITHER_STUDENT_OR_TEACHER_DOES_NOT_EXIST,

    STR_VAL,
    OBJ_VAL,

    EMPTY_BODY,
    EMPTY_PARAMETERS,
    TEACHER_DATA_NOT_REQUESTED,
    SCHOOL_INFORMATION,
    STUDENT_TO_TEACHER_REGISTRATION,

    CODE_SUCCESS,
    CODE_NO_CONTENT,
    CODE_BAD_REQUEST,
    CODE_NOT_FOUND,
    CODE_ALREADY_EXISTS,
    CODE_INTERNAL_SERVER_ERROR
};