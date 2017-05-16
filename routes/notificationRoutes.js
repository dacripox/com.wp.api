var express = require('express');
var router = express.Router();
var emailHelper = require('../helpers/emailHelper.js');
var onesignalHelper = require('../helpers/onesignalHelper.js');

/*
 * GET
 */
router.get('/email', emailHelper.testEmail);


/*
 * GET
 */
router.get('/push', onesignalHelper.testSendNotificationToAll);



module.exports = router;
