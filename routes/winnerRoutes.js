var express = require('express');
var router = express.Router();
var winnerController = require('../controllers/winnerController.js');

/*
 * GET
 */
router.get('/', winnerController.list);

/*
 * GET
 */
router.get('/promotion/:promo_id', winnerController.listByPromotion);

/*
 * GET
 */
router.get('/:id', winnerController.show);

/*
 * POST
 */
router.post('/', winnerController.create);

/*
 * PUT
 */
router.put('/:id', winnerController.update);

/*
 * DELETE
 */
router.delete('/:id', winnerController.remove);

module.exports = router;
