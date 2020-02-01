const express = require('express')
const router = express.Router()
const RetrieveForNotificationController = require('../../controllers/retrieve/retrieve_for_notification.controllers')

router.post('/api/retrievefornotifications', RetrieveForNotificationController.retrieveForNotification)

module.exports = router;