// area del index
const express = require("express"),
	router = express.Router(),
	upload = require('multer')({
		dest: 'uploads/'
	}),
	passport = require('../../config/passport.js'),
	controller = require('./file.controller.js');

// se pone multer como un middleware para los archivos y luego
// el controllador donde ya se puede manejar el archivo
router.post('/file', upload.single(), controller.file);

module.exports = router;
