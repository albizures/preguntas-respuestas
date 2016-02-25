'use strict';
const model = require("./opcion.model.js"),
			passport = require('../../config/passport.js');

module.exports.getByType = function (req, res) {
	model.getByType(req.params.id, function (result) {
		res.json(result);
	})
}
module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
}
module.exports.getTypes = function (req, res) {
	model.getTypes(function (result) {
		res.json(result);
	});
};
module.exports.post = function (req, res) {
	let data = [
		req.body.nombre,
		req.body.descripcion,
		req.body.titulo,
		req.body.idPadre,
		req.body.idTipo,
		req.body.orden
	];
	model.post(data, function (result) {
 	 res.json(result);
  });
};
module.exports.getAll = function (req, res) {
	model.getAll(function (result) {
		res.json(result);
	});
};
module.exports.getOne = function (req, res) {
	model.getOne(req.params.id, function (result) {
		res.json(result);
	});
};
module.exports.update = function (req, res) {
	let data = [
		req.body.id,
		req.body.nombre,
		req.body.descripcion,
		req.body.titulo,
		req.body.idPadre,
		req.body.idTipo,
		req.body.orden
	];
	model.update(data, function (result) {
		res.json(result);
	});
};
module.exports.getByRol = function (req, res) {
	model.getByRol(req.params.id, function (result) {
		res.json(result);
	});
}
