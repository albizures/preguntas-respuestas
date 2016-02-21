'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');

module.exports.getAll = function (cb) {
	const query = 'call sp_sel_cat_organizacion()';
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
};
module.exports.post = function (nombre, cb) {
	const query = 'select fn_ins_cat_organizacion( ? ) as id';
	connection(query, nombre, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar la organizacion , intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.delete = function (id, cb) {
	const query = 'call sp_del_cat_organizacion( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar la organizacion, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
