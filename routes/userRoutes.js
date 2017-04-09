var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var participationController = require('../controllers/participationController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/exist/email/:email/phone/:phone', userController.checkIfUserExist);


/*
 * GET
 */
router.get('/participates/:userId/:promoId', participationController.userIsParticipating);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * GET
 */
router.get('/id/:userId', userController.showByUserId);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
