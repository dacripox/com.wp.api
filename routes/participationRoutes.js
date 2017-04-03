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
router.get('/:id', participationController.show);

/*
 * POST
 */
router.post('/', participationController.create);

/*
 * PUT
 */
router.put('/:id', participationController.update);

/*
 * DELETE
 */
router.delete('/:id', participationController.remove);

module.exports = router;
