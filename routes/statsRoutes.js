var express = require('express');
var router = express.Router();
var statsController = require('../controllers/statsController.js');

/*
 * GET
 */
router.get('/barchart/promotion/:promoId/date/:day/:month/:year', statsController.barChart);
/*
 * GET
 */
router.get('/general/promotion/:promoId', statsController.general);


module.exports = router;
