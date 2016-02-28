'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');
module.exports.getByPrecalificado = function (id, cb) {
	const query = 'call sp_sel_pyr_evento_pre( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
