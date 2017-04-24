var express = require('express');
var router = express.Router();
var participationController = require('../controllers/participationController.js');

/*
 * GET
 */
router.get('/', participationController.list);

/*
 * GET
 */
router.get('/promotion/:promoId', participationController.listByPromotion);
/*
 * GET
 */
router.get('/user/:userId/promotion/:promoId', participationController.showByUserIdAndPromoId);

/*
 * GET
 */
router.get('/:id', participationController.show);

/*
 * POST
 */
router.post('/', participationController.create);

/*
 * POST
 */
router.post('/increment-points/user/:userId/promotion/:promoId/points/:points', participationController.incrementPoints);

/*
 * POST
 */
router.post('/increment-visualization/user/:userId/promotion/:promoId', participationController.incrementVisualization);
/*
 * POST
 */
router.post('/increment-participation/user/:userId/promotion/:promoId', participationController.incrementParticipation);
/*
 * POST
 */
router.post('/increment-participation/promotion/:promoId', participationController.incrementParticipationPromo);

/*
 * PUT
 */
router.put('/:id', participationController.update);

/*
 * DELETE
 */
router.delete('/:id', participationController.remove);

module.exports = router;
