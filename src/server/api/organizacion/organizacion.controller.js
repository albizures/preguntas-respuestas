const model = require("./organizacion.model.js"),
			passport = require('../../config/passport.js');

module.exports.post = function (req, res) {
	model.post(req.body.nombre, function (result) {
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
	const query = 'call sp_upd_cat_organizacion( ?, ? )';
};
module.exports.delete = function (req, res) {
	model.delete(req.params.id, function (result) {
		res.json(result);
	});
};
