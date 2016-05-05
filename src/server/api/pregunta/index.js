'use strict';
const express = require("express"),
	router = express.Router(),
	controller = require('./pregunta.controller.js');

router.post('/',  controller.post);

router.get('/evento/:id/precalificado', controller.getByEventoPrecalificado);
router.get('/evento/:id', controller.getByEvento);
router.get('/evento/:evento/ambito/:ambito', controller.getByEventoAmbito);
router.get('/file/:file/obj/:obj', controller.getComentarioFiledObj);

module.exports = router;
