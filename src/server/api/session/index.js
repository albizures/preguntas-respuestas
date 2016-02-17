const express = require("express"),
	router = express.Router(),
	controller = require('./session.controller.js');

router.get('/', controller.session);
router.post('/', controller.login, controller.session);
router.get('/logout', controller.logout);

module.exports = router;
