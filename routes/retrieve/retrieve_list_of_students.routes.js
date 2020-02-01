const express = require('express')
const router = express.Router()
const RetrieveListofStudentsController = require('../../controllers/retrieve/retrieve_list_of_students.controllers')

router.get('/api/commonstudents', RetrieveListofStudentsController.retrieveListofStudents);

module.exports = router;