'use strict';
const model = require("./ambitos.model.js"),
			passport = require('../../config/passport.js');

module.exports.post = function (req, res) {
	var data = [req.body.nombre,req.body.codigo];

	model.post(data,function (resp) {
		res.json(resp);
	});
};

module.exports.getAll = function (req, res) {
	model.getAll(function(resp){
		res.json(resp);
	})
};

module.exports.getOne = function (req, res) {
	var id = parseInt(req.params.id);
	model.getOne(id,function(resp){
		res.json(resp);
	});
};

module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
};
