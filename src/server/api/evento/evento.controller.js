'use strict';
const model = require("./evento.model.js");

module.exports.getFileHtml = function (req, res) {
	model.getFileHtml(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.getFilesHtml = function (req, res) {
	model.getFilesHtml(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.getAuthUsuario = function (req, res) {
	console.log('este es el id', req.user.id);
	model.getAuthUsuario(req.user.id, function (result) {
		res.json(result);
	});
};

module.exports.postOrganizacion = function (req, res) {
	let data = [
		req.body.id,
		req.body.idEvento,
	];
	model.postOrganizacion(data, function (result) {
		res.json(result);
	});
};

module.exports.deletePrecalificado = function (req, res) {
	model.deletePrecalificado(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.deleteConsultor = function (req, res) {
	model.deleteConsultor(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.postConsultor = function (req, res) {
	let data = [
		req.body.idConsultor,
		req.body.idEvento,
		req.body.idAmbito,
		req.body.Secretario
	];
	model.postConsultor(data, function (result) {
		res.json(result);
	});
};

module.exports.getSecretarioByAmbito = function (req, res) {
	let data = [
		req.params.id,
		req.params.ambito
	];
	model.getSecretarioByAmbito(data, function (result) {
		res.json(result);
	});
};

module.exports.getConsultores = function (req, res) {
	model.getConsultores(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.getPrecalificados = function (req, res) {
	model.getPrecalificados(req.params.id, function (result) {
		res.json(result);
	});
};

module.exports.getFiles = function (req, res) {
	model.getFiles(req.params.id, function (result) {
			res.json(result);
	});
};

module.exports.post = function (req, res) {
	let data = [
		req.body.nombre,
		req.body.descripcion,
		req.body.fecha_inicio,
		req.body.fecha_final
	];
	model.post(data, function (result) {
		res.json(result);
	});
}

module.exports.getAll = function (req, res) {
	model.getAll(function (result) {
		res.json(result);
	});
};

module.exports.getByPrecalificado = function (req, res) {
	model.getByPrecalificado(req.user.id, function (result) {
		res.json(result);
	});
};
