'use strict';
const connection = require("../../components/connection.js"),
		result = require('../../components/utils/result.js');

module.exports.getByEventoAmbito = function (data, cb) {
	const query = 'call sp_sel_pyr_pregunta_eventoAmbito( ?, ? , ?)';
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
}

module.exports.getByEventoPrecalificado = function (data, cb) {
	const query = 'call sp_sel_pyr_pregunta_evento_prec( ?, ? )';
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
}

module.exports.getByEvento = function (id, cb) {
	const query = 'call sp_sel_pyr_pregunta_evento( ? )';
	connection(query, id, function (err, rows) {
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

module.exports.postAmbitoPregunta = function (data, cb) {
	const query = 'select fn_ins_pyr_pregunta_ambito( ?, ? ) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar un ambito, intentelo de nuevo';
		}else{
			rows = rows[0].id;
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows));
		}
	});
};

module.exports.post = function (data, cb) {
	const query = "select fn_ins_pyr_pregunta1( ?, ?, ?, ?, ? ) as id";
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar la pregunta, intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
			rows = rows[0].id;
		}
		if (cb) {
			cb(result(code, err, rows));
		}
	});
};

module.exports.getComentarioFiledObj = function (data, cb) {
	const query = "call sp_sel_pyr_pregunta_OBJ( ?, ? )";
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
