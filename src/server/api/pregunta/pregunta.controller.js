'use strict';
const model = require("./pregunta.model.js");

module.exports.getComentarioFiledObj = function (req, res) {
	let data = [
		req.params.file,
		req.params.obj
	];
	model.getComentarioFiledObj(data, function (result) {
		console.log(result);
		res.json(result);
	});
};
