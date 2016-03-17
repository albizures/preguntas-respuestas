'use strict';
const express = require("express"),
	router = express.Router(),
	controller = require('./evento.controller.js');

router.post('/', controller.post);
router.post('/consultor', controller.postConsultor);
router.post('/organizacion', controller.postOrganizacion);

router.get('/', controller.getAll);
router.get('/auth/usuario', controller.getAuthUsuario);
router.get('/:id/file/html', controller.getFilesHtml);
router.get('/:id/consultores', controller.getConsultores);
router.get('/:id/secretario/:ambito', controller.getSecretarioByAmbito);
router.get('/:id/precalificados', controller.getPrecalificados);
router.get('/files/:id', controller.getFiles);
router.get('/precalificado', controller.getByPrecalificado);

router.delete('/consultor/:id' , controller.deleteConsultor);
router.delete('/precalificado/:id' , controller.deletePrecalificado);
module.exports = router;
