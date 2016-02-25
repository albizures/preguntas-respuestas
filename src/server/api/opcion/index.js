const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./opcion.controller.js');

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/rol/:id', controller.getByRol);
router.get('/types', controller.getTypes);
router.get('/type/:id', controller.getByType);
router.get('/:id', controller.getOne);

router.put('/', controller.update);

router.delete('/:id', controller.delete);
module.exports = router;
