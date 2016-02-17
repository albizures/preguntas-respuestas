const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./rol.controller.js');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.put('/', controller.update);
router.get('/:id', controller.getOne);

module.exports = router;
