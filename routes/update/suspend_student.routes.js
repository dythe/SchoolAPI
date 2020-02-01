const express = require('express')
const router = express.Router()
const constants = require('../../utils/constants.js');
const SuspendStudentController = require('../../controllers/update/suspend_student.controllers')

router.post(constants.SUSPEND_STUDENT_API_URL, SuspendStudentController.suspendStudent)

module.exports = router;