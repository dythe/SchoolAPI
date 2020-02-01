var EMPTY_BODY = {};

var QUICK_REGISTRATION_GIGA = {
    email: "studentgiga@gmail.com",
    name: "Giga Ma",
    user_type: 0,
    user_status: 0
}

var QUICK_REGISTRATION_BOB = {
    email: "studentbob@gmail.com",
    name: "Bob Poon",
    user_type: 0,
    user_status: 0
}

//**  studentagnes@gmail.com - mentioned but not registered with teacherken@gmail.com
//    studentmiche@gmail.com - mentioned but not registered with teacherken@gmail.com
//    studentbob@gmail.com   - not mentioned but registered with teacherken@gmail.com
//    studentshawn@gmail.com - mentioned but suspended                                       **/
var INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL = {
    teacher: "teacherken@gmail.com",
    notification: "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com @studentshawn@gmail.com"
};

var REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID = {
    students: "studentabc@gmail.com",
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

var REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID = {
    teacher: "teacherpauline@gmail.com",
    students:
        [
            "studentdef@gmail.com",
            "studentamy@gmail.com"
        ]
};

var REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS = {
    students: "studentjon@gmail.com",
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

var REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS = {
    teacher: "teacherpauline@gmail.com",
    students:
        [
            "studenthon@gmail.com",
            "studentamy@gmail.com"
        ]
};

var REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT = {
    students: ["studentjon@gmail.com"],
    teacher:
        [
            "teacherpeter@gmail.com",
            "teacherken@gmail.com"
        ]
};

var REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING = {
    students: "studentjon@gmail.com",
    teacher: "teacherjoe@gmail.com"
};

module.exports.EMPTY_BODY = EMPTY_BODY;
module.exports.QUICK_REGISTRATION_GIGA = QUICK_REGISTRATION_GIGA;
module.exports.QUICK_REGISTRATION_BOB = QUICK_REGISTRATION_BOB;
module.exports.INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL = INSERT_STUDENT_TO_TEACHER_FOR_NOTIFICATION_RETRIEVAL;
module.exports.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID = REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENT_INVALID;
module.exports.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID = REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHER_INVALID;
module.exports.REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS = REGISTER_STUDENT_TO_TEACHER_ONE_STUDENT_MANY_TEACHERS;
module.exports.REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS = REGISTER_STUDENT_TO_TEACHER_ONE_TEACHER_MANY_STUDENTS;
module.exports.REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT = REGISTER_STUDENT_TO_TEACHER_OBJECT_AND_OBJECT;
module.exports.REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING = REGISTER_STUDENT_TO_TEACHER_STRING_AND_STRING;