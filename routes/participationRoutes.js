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
router.get('/:id', participationController.show);

/*
 * POST
 */
router.post('/', participationController.create);

/*
 * POST
 */
router.post('/increment-points/:userId/:points', participationController.incrementPoints);

/*
 * POST
 */
router.post('/increment-visualization/:userId', participationController.incrementVisualization);
/*
 * POST
 */
router.post('/increment-participation/:userId', participationController.incrementParticpation);

/*
 * PUT
 */
router.put('/:id', participationController.update);

/*
 * DELETE
 */
router.delete('/:id', participationController.remove);

module.exports = router;
