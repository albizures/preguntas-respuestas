'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');

module.exports.searchName = function (name, cb) {
	const query = 'select * from seg_usuario WHERE nombre = ?';
	connection(query, name, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			err = 'Ocurrio un error al ingresar al usuarios, intentelo de nuevo';
			rows = false;
		} else {
			if (!rows[0]) {
				rows = true;
			} else {
				code = 3;
				rows = false;
				err = name +' ya esta en uso, cambie el nombre de usuario';
			}
		}
		if (cb) {
			cb(result(code, err, rows));
		}
	});
}
module.exports.update = function (data, cb) {
	const query = 'call sp_upd_seg_usuario( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	connection(query, data, function (err, rows) {
		// TODO: verificar que si se hizo el cambio
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar editar al usuario, intentelo de nuevo';
		}else{
			err = 'Se edito correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
module.exports.getAll = function (cb) {
	const query = 'call sp_sel_seg_usuarios()';
	connection(query, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al consultar todos los usuarios, intentelo de nuevo';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};
module.exports.getEstado = function (cb) {
	const query = 'call sp_sel_pg_estado_usuario()';
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
}
module.exports.getOne = function (id, cb) {
	const query = 'call sp_sel_seg_usuarioId( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al consultar al usuario, intentelo de nuevo';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.delete = function (id, cb) {
	const query = 'call sp_del_seg_usuario( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar al usuario, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
module.exports.post = function (data, cb) {
	const query = 'select fn_ins_seg_usuario( ?, ?, ?, ?, ?, ?, ?, ?, ?) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar al usuario , intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}
