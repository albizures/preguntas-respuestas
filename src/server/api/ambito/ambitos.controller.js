const model = require("./ambitos.model.js"),
			passport = require('../../config/passport.js');

module.exports.post = function (req, res) {
	var data = [req.body.nombre,req.body.codigo];

	model.post(data,function (resp) {
		res.json(resp); 
	});
};

module.exports.getAll = function (req, res) {
	model.ambitoSel(function(resp){
		res.json(resp);
	})
};

module.exports.getOne = function (req, res) {
	var id = parseInt(req.params.id);
	model.ambitoD(id,function(resp){
		res.json(resp);
	});

};
