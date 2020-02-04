const EMPTY_BODY = '';

const EMPTY_ARRAY = [];

// suspend_student.test.js
const REQUEST_VALUE_2_FOR_TEST_CASE_SUSPEND_STUDENT = { 
    student: "studentshawn@gmail.com" 
};

const REQUEST_VALUE_3_FOR_TEST_CASE_SUSPEND_STUDENT = { 
    student: "studentmas@gmail.com"
};

// retrieve_for_notification.test.js (It should return the students to be notified that meets the criteria when there are students that are mentioned)
const EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION = [
    'studentbob@gmail.com',
    'studentagnes@gmail.com',
    'studentmiche@gmail.com'
];

const EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION = [
    'studentbob@gmail.com'
];

const EXPECTED_RESULT_6_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION = [
    'studentbob@gmail.com',
    'studentagnes@gmail.com'
];

// retrieve_list_of_students.test.js
const REQUEST_VALUE_2_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT = [
    'teacherken@gmail.com',
    'teacherpauline@gmail.com',
    'teacherjoe@gmail.com'
];

// quick_registration_of_user.test.js
const REQUEST_VALUE_2_FOR_TEST_CASE_QUICK_REGISTRATION = {
    email: "studentgiga@gmail.com",
    name: "Giga Ma",
    user_type: 0,
    user_status: 0
}

const REQUEST_VALUE_3_FOR_TEST_CASE_QUICK_REGISTRATION = {
    email: "studentjon@gmail.com",
    name: "Jon Goh",
    user_type: 0,
    user_status: 0
};

const EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT = [
    'studentamy@gmail.com'
];

const REQUEST_VALUE_3_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT = 'teacherken@gmail.com';

const EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT = [
    "studentagnes@gmail.com",
    "studentamy@gmail.com",
    "studenthon@gmail.com"
];

const REQUEST_VALUE_4_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT = [
    'teacherken@gmail.com',
    'teacherpauline@gmail.com',
    'teacherjoe@gmail.com',
    'teacherannie@gmail.com'
];

const QUICK_REGISTRATION_GIGA = {
    email: "studentgiga@gmail.com",
    name: "Giga Ma",
    user_type: 0,
    user_status: 0
}

const QUICK_REGISTRATION_BOB = {
    email: "studentbob@gmail.com",
    name: "Bob Poon",
    user_type: 0,
    user_status: 0
}

//**  studentagnes@gmail.com - mentioned but not registered with teacherken@gmail.com
//    studentmiche@gmail.com - mentioned but not registered with teacherken@gmail.com
//    studentbob@gmail.com   - not mentioned but registered with teacherken@gmail.com
//    studentshawn@gmail.com - mentioned but suspended                                       **/
const INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS = {
    teacher: "teacherken@gmail.com",
    notification: "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com @studentshawn@gmail.com"
};

const INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS = {
    teacher: "teacherken@gmail.com",
    notification: "Hey everybody"
};

// studentbose@gmail.com - is not registered in school database
const INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_STUDENT = {
    teacher: "teacherken@gmail.com",
    notification: "Hello students! @studentbose@gmail.com @studentagnes@gmail.com"
};

// teacherabc@gmail.com is not a valid teacher
const INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_TEACHER = {
    teacher: "teacherabc@gmail.com",
    notification: "Hello students! @studentbose@gmail.com @studentagnes@gmail.com"
};

const INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS_INVALID_TEACHER = {
    teacher: "teacherabc@gmail.com",
    notification: "Hey everybody"
};

const REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID = {
    students: "studentabc@gmail.com",
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

const REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID = {
    teacher: "teacherpauline@gmail.com",
    students:
        [
            "studentdef@gmail.com",
            "studentamy@gmail.com"
        ]
};

const REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS = {
    students: "studentjon@gmail.com",
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

const REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS = {
    teacher: "teacherpauline@gmail.com",
    students:
        [
            "studenthon@gmail.com",
            "studentamy@gmail.com"
        ]
};

const REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS_INVALID_CASE = {
    teacher: "teacherpauline@gmail.com",
    students:
        [
            "studentlami@gmail.com",
            "studentmas@gmail.com"
        ]
};


const REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT = {
    students: ["studentjon@gmail.com"],
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

const REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING = {
    students: "studentjon@gmail.com",
    teacher: "teacherjoe@gmail.com"
};

module.exports = {
    EMPTY_BODY,
    EMPTY_ARRAY,

    REQUEST_VALUE_2_FOR_TEST_CASE_SUSPEND_STUDENT,
    REQUEST_VALUE_3_FOR_TEST_CASE_SUSPEND_STUDENT,

    REQUEST_VALUE_2_FOR_TEST_CASE_QUICK_REGISTRATION,
    REQUEST_VALUE_3_FOR_TEST_CASE_QUICK_REGISTRATION,

    REQUEST_VALUE_2_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT,
    REQUEST_VALUE_3_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT,
    REQUEST_VALUE_4_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT,

    EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION,
    EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION,
    EXPECTED_RESULT_6_FOR_TEST_CASE_RETRIEVE_FOR_NOTIFICATION,

    EXPECTED_RESULT_2_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT,
    EXPECTED_RESULT_3_FOR_TEST_CASE_RETRIEVE_LIST_OF_STUDENT,

    INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS,
    INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS,

    INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_NO_MENTIONS_INVALID_TEACHER,

    INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_STUDENT,
    INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL_WITH_MENTIONS_WITH_INVALID_TEACHER,

    REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS_INVALID_CASE,
    QUICK_REGISTRATION_GIGA,
    QUICK_REGISTRATION_BOB,
    REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID,
    REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID,
    REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS,
    REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS,
    REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT,
    REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING
};
