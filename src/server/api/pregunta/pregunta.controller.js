'use strict';
const model = require("./pregunta.model.js");

module.exports.getByEvento = function (req, res) {
	model.getByEvento(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.post = function (req, res) {
	let originalResult,
		data = [
		req.body.clave,
		req.body.idEvento,
		req.body.idDoc,
		req.user.id,
		req.body.pregunta
	],
		ambitos = req.body.ambitos;
	model.post(data, function (result) {
		if (result.code == 0) {
			originalResult = result;
			addAmbito(0);
		} else {
			res.json(result);
		}
	});
	function addAmbito(index) {
		if (index > ambitos.length) {
			res.json(originalResult);
		} else {
			model.postAmbitoPregunta([originalResult.data, ambitos[index]], function (result) {
				if (result.code == 0) {
					addAmbito(index + 1);
				} else {
					res.json(result);
				}
			});
		}
	}

};

module.exports.getComentarioFiledObj = function (req, res) {
	let data = [
		req.params.file,
		req.params.obj
	];
	model.getComentarioFiledObj(data, function (result) {
		res.json(result);
	});
};
