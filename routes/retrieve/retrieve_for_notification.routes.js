const express = require('express')
const router = express.Router()
const constants = require('../../utils/constants.js');
const RetrieveForNotificationController = require('../../controllers/retrieve/retrieve_for_notification.controllers')

router.post(constants.RETRIEVE_FOR_NOTIFICATION_API_URL, RetrieveForNotificationController.retrieveForNotification)

module.exports = router;