const model = require("./session.model.js"),
			_ = require('lodash'),
			config = require('../../config/environment'),
			jwt = require('jsonwebtoken'),
			passwordUtils = require("../../components/utils/password.js");


function createToken(user) {
	return jwt.sign(_.omit(user, 'clave'), config.secret, { expiresIn: 60 * 60 * 12 * 100 });
}

module.exports.logout = function (req, res) {
	res.json([]);
};
module.exports.session = function (req, res) {
	if (!req.user){
		res.status(401);
		return res.json({
			status : "error",
			message : 'Aun no ha iniciado sesion.'
		});
	}
	model.session(req.user, function (resp) {
		resp.status = "success";
		res.json(resp);
	});
};

module.exports.login = function (req, res, next) {
	model.getUsuario(req.body.username, function (err, rows) {
		if (err) { // se Verifica si dio error la consulta
			return res.json({
				status : 'error',
				message : 'Falló el ingreso al sistema. Datos de ingreso incorrectos.'
			});
		}
		if (!rows || !rows[0] || !rows[0][0]) { // se verifica que haya devuelto algun usuario la consulta
			return res.json({
				status : 'error',
				message : 'Falló el ingreso al sistema. Datos de ingreso incorrectos.'
			});
		}
		if (!passwordUtils.checkPassword(rows[0][0].clave, req.body.password)) { // se valida la contraseña
			return res.json({
				status : 'error',
				message : 'Falló el ingreso al sistema. Datos de ingreso incorrectos.'
			});
		}
		// se pone toda la informacion que viene en el sp en la variable de sesion
		// si se quieren quitar datos, hacer un nuevo objecto y pasarlor
		return res.json({
			status : 'success',
			message : 'Bienvenido al sistema',
			data : createToken(rows[0][0])
		});
	});
};
