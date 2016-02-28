const express = require("express"),
	router = express.Router(),
	controller = require('./organizacion.controller.js');

router.post('/', controller.post);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

router.put('/', controller.update);

router.delete('/:id', controller.delete);
module.exports = router;
