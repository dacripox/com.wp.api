var express = require('express');
var router = express.Router();
var statsController = require('../controllers/statsController.js');

/*
 * GET
 */
router.get('/barchart/:promoId', statsController.barChart);



module.exports = router;
