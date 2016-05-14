'use strict';
const express = require("express"),
	router = express.Router(),
	controller = require('./pregunta.controller.js');

router.post('/',  controller.post);
router.post('/comentario', controller.postComentario);
router.post('/respuesta', controller.postRespuesta);

router.get('/evento/:id/precalificado', controller.getByEventoPrecalificado);
router.get('/evento/:id', controller.getByEvento);
router.get('/evento/:evento/ambito/:ambito', controller.getByEventoAmbito);
router.get('/file/:file/obj/:obj', controller.getComentarioFiledObj);
router.get('/:pregunta/ambito/:ambito', controller.getPreguntaByAmbito);
router.get('/:pregunta/comentarios/ambito/:ambito', controller.getComentariosByAmbito);

module.exports = router;
