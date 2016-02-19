const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./usuarios.controller.js');

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/estado', controller.getEstado);
router.get('/:id', controller.getOne);

router.put('/', controller.update);
router.put('/pass', controller.updatePass);

router.delete('/:id', controller.delete);

module.exports = router;
