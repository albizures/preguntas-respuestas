'use strict';
const connection = require("../../components/connection.js"),
		result = require('../../components/utils/result.js');

module.exports.post = function (data, cb) {
	var query = "select fn_ins_cat_ambito( ?, ? ) as id";
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar el ambito , intentelo de nuevo';
		} else {
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}

module.exports.getAll = function (cb) {
	var query = "call sp_sel_cat_ambito( )";
	connection(query, '', function (err, rows) {
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
	var query = "call sp_del_cat_ambito(?)";
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
module.exports.delete = function (id, cb) {
	const query = 'call sp_del_cat_ambito( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar el ambito, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
