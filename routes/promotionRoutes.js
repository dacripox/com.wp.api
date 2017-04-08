var express = require('express');
var router = express.Router();
var promotionController = require('../controllers/promotionController.js');

/*
 * GET
 */
router.get('/', promotionController.list);

/*
 * GET
 */
router.get('/:id', promotionController.show);

/*
 * GET
 */
router.get('/id/:promoId', promotionController.showByPromoId);

/*
 * GET
 */
router.get('/company/:companyId', promotionController.listPromotionsByCompanyId);


/*
 * GET
 */
router.get('/available/:name', promotionController.idAvailable); //TODO: make variables name consistent

/*
 * POST
 */
router.post('/endWithRaffle/:idPromo', promotionController.endPromoWithRaffle);

/*
 * POST
 */
router.post('/end/:idPromo', promotionController.endPromotion);

/*
 * POST
 */
router.post('/', promotionController.create);

/*
 * PUT
 */
router.put('/:id', promotionController.update);

/*
 * DELETE
 */
router.delete('/:id', promotionController.remove);

module.exports = router;
