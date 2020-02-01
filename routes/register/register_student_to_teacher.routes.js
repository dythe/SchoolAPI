const express = require('express')
const router = express.Router()
const RegisterStudentToTeacherController = require('../../controllers/register/register_student_to_teacher.controllers')

router.post('/api/register', RegisterStudentToTeacherController.registerStudentToTeacher);

module.exports = router;