const express = require('express')
const router = express.Router()
const constants = require('../../utils/constants.js');
const RetrieveListofStudentsController = require('../../controllers/retrieve/retrieve_list_of_students.controllers')

router.get(constants.RETRIEVE_LIST_OF_STUDENTS_API_URL, RetrieveListofStudentsController.retrieveListofStudents);

module.exports = router;