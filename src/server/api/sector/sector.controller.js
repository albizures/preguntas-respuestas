'use strict';
const model = require("./sector.model.js");

module.exports.getAll = function (req, res) {
	model.getAll(function (result) {
		res.json(result);
	});
};
module.exports.post = function (req, res) {
	model.post(req.body.nombre, function (result) {
		res.json(result);
	});
};
module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
};
