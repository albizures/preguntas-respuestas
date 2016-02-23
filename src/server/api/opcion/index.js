const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./opcion.controller.js');

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/rol/:id', controller.getByRol);
router.get('/:id', controller.getOne);
router.put('/', controller.update);

module.exports = router;
