const express = require("express"),
	router = express.Router(),
	passport = require('../../config/passport.js'),
	controller = require('./rol.controller.js');

router.post('/', controller.post);
router.post('/opcion', controller.postOpcion);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

router.put('/', controller.update);

router.delete('/:id', controller.delete);
router.delete('/opcion/:opcion/:rol', controller.deleteOpcion);

module.exports = router;
