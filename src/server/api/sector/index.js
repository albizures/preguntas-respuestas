const express = require("express"),
	router = express.Router(),
	controller = require('./sector.controller.js');

router.get('/', controller.getAll);

router.post('/', controller.post);

router.delete('/:id', controller.delete);

module.exports = router;
