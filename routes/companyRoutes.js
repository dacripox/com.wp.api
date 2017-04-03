var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companyController.js');

/*
 * GET
 */
router.get('/', companyController.list);

/*
 * GET
 */
router.get('/:id', companyController.show);

/*
 * POST
 */
router.post('/', companyController.create);

/*
 * PUT
 */
router.put('/:id', companyController.update);

/*
 * DELETE
 */
router.delete('/:id', companyController.remove);

module.exports = router;
