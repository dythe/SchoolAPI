const express = require('express')
const router = express.Router()
const constants = require('../../utils/constants.js');
const RegisterStudentToTeacherController = require('../../controllers/register/register_student_to_teacher.controllers')

router.post(constants.REGISTER_STUDENT_TO_TEACHER_API_URL, RegisterStudentToTeacherController.registerStudentToTeacher);

module.exports = router;