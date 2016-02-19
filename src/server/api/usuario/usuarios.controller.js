'use strict';
const model = require("./usuarios.model.js"),
			passport = require('../../config/passport.js');

module.exports.post = function (req, res) {
	let data = [
		req.body.nombre,
		req.body.nombres,
		req.body.apellidos,
		req.body.clave,
		req.body.idrol,
		req.body.idorganizacion,
		req.body.estado,
		req.body.email,
		req.body.cargo
	];
	model.searchName(req.body.nombre, onSearchName);
	function onSearchName(resultSearch) {
		if (resultSearch.code == 0) {
			model.post(data, onPost);
		} else {
			res.json(resultSearch);
		}
	}
	function onPost(result) {
		res.json(result)
	}
};
module.exports.getAll = function (req, res) {
	model.getAll(function (result) {
		res.json(result);
	});
};
module.exports.getEstado = function (req, res) {
	model.getEstado(function (result) {
		res.json(result);
	});
}
module.exports.update = function (req, res) {
	let data = [
		req.body.id,
		req.body.nombre,
		req.body.nombres,
		req.body.apellidos,
		req.body.idrol,
		req.body.idorganizacion,
		req.body.estado,
		req.body.email,
		req.body.cargo
	];
	model.update(data, function (result) {
		res.json(result);
	});
};
module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
};
module.exports.updatePass = function (req, res) {

};
module.exports.getOne = function (req, res) {
	model.getOne(req.params.id, function (result) {
		res.json(result);
	});
};
