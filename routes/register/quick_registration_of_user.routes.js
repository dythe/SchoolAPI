const express = require('express')
const router = express.Router()
const QuickRegistrationofUserController = require('../../controllers/register/quick_registration_of_user.controllers')

router.post('/api/quickregistration', QuickRegistrationofUserController.quickRegistrationofUser)

module.exports = router;