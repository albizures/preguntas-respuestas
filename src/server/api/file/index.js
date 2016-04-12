// area del index
const express = require("express"),
	router = express.Router(),
	upload = require('multer')({
		dest: 'uploads/'
	}),
	controller = require('./file.controller.js');

// se pone multer como un middleware para los archivos y luego
// el controllador donde ya se puede manejar el archivo
router.post('/file', upload.single('file'), controller.file);
router.post('/evento',upload.single('file'), controller.evento);

module.exports = router;
