const model = require("./rol.model.js"),
			passport = require('../../config/passport.js');

module.exports.post = function (req, res) {

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

};
