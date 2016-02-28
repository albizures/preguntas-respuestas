'use strict';
const express = require("express"),
	router = express.Router(),
	controller = require('./evento.controller.js');

router.get('/precalificado', controller.getByPrecalificado);

module.exports = router;
