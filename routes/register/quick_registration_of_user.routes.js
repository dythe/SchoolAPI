const express = require('express')
const router = express.Router()
const constants = require('../../utils/constants.js');
const QuickRegistrationofUserController = require('../../controllers/register/quick_registration_of_user.controllers')

router.post(constants.QUICK_REGISTRATION_API_URL, QuickRegistrationofUserController.quickRegistrationofUser)

module.exports = router;