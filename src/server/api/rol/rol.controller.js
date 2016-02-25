'use strict';
const model = require("./rol.model.js");

module.exports.postOpcion = function (req, res) {
	let opciones = [
		[req.body.rol, req.body.opcion]
	];
	model.insertIntoOpcion(opciones, function (result) {
		res.json(result);
	});
}
module.exports.post = function (req, res) {
	let originalResult;
	model.post(req.body.nombre, onQuery);
	function onQuery(result) {
		if (req.body.opciones.length == 0) {
			res.json(result);
		} else {
			let opciones = [];
			originalResult = result;
			for (var i = 0; i < req.body.opciones.length; i++) {
				opciones.push([result.data.id, req.body.opciones[i]]);
			}
			console.log(opciones);
			if (result.code == 0) {
				modelOpcion.insertIntoOpcion(opciones, onInsertIntoOpcion);
			}
		}
	}
	function onInsertIntoOpcion(result) {
		if (result.code == 0) {
			res.json(originalResult);
		} else {
			res.json(result);
		}
	}
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
	let data = [req.body.id, req.body.nombre];
	model.update(data, function (result) {
		res.json(result);
	});
};
module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
};
module.exports.deleteOpcion = function (req, res) {
	model.deleteOpcion([req.params.rol, req.params.opcion], function (result) {
		res.json(result);
	});
};
