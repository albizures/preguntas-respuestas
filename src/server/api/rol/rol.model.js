'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');

module.exports.update = function (data, cb) {
	const query = 'call sp_upd_seg_rol( ?, ? )';
	connection(query, data, function (err, rows) {
		// TODO: verificar que si se hizo el cambio
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar editar el rol, intentelo de nuevo';
		}else{
			err = 'Se edito correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.delete = function (id, cb) {
	const query = 'call sp_del_seg_rol( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar el rol, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.deleteOpcion = function (data, cb) {
	const query = 'call sp_del_seg_opcion_idRol( ? , ? )';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar el permiso, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.getAll = function (cb) {
	const query = 'call sp_sel_seg_rol()';
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
module.exports.post = function (nombre, cb) {
	const query = 'select fn_ins_seg_rol( ? ) as id';
	connection(query, nombre, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar el rol, intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
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
