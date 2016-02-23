'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');
module.exports.insertInto = function (data, cb) {
	const query = 'INSERT INTO seg_rol_opcion (idrol, idopcion) VALUES ?';
	connection(query, [data], function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.getByRol = function (id, cb) {
	const query = 'call sp_sel_seg_opcion_idRol( ? )';
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
module.exports.getAll = function (cb) {
	const query = 'call sp_sel_seg_opcion()';
	connection(query, function (err, rows) {
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
module.exports.getOne = function (id, cb) {
	const query = 'call sp_sel_seg_usuarioId( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
		}
		if (cb) {
			cb(code, err, rows[0]);
		}
	});
}
