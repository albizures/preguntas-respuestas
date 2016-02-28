'use strict';
const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./ambitos.controller.js');

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

router.delete('/:id', controller.delete);
module.exports = router;
