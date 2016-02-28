'use strict';
const model = require("./evento.model.js");

module.exports.getByPrecalificado = function (req, res) {
	model.getByPrecalificado(req.user.id, function (result) {
		res.json(result);
	});
};
