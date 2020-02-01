const express = require('express')
const router = express.Router()
const SuspendStudentController = require('../../controllers/update/suspend_student.controllers')

router.post('/api/suspend', SuspendStudentController.suspendStudent)

module.exports = router;