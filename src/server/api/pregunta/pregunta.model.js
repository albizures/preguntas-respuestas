'use strict';
const connection = require("../../components/connection.js"),
		result = require('../../components/utils/result.js');

module.exports.getComentarioFiledObj = function (data, cb) {
	var query = "call sp_sel_pyr_pregunta_OBJ( ?, ? )";
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error, intentelo de nuevo';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
