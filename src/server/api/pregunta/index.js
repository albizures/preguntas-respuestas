'use strict';
const express = require("express"),
	router = express.Router(),
	controller = require('./pregunta.controller.js');

router.post('/',  controller.post);

router.get('/file/:file/obj/:obj', controller.getComentarioFiledObj);

module.exports = router;
