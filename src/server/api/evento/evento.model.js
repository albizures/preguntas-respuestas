'use strict';
const connection = require("../../components/connection.js"),
	result = require('../../components/utils/result.js');

module.exports.postFile = function (data, cb) {
	const query = 'select fn_ins_pyr_evento_doc_det_file (?, ?, ?, ?) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar el archivo, intentelo de nuevo';
		} else {
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0].id));
		}
	});
};

module.exports.postDocument = function (data, cb) {
	const query = 'select fn_ins_pyr_evento_doc_det( ?, ? , ?) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar el documento, intentelo de nuevo';
		} else {
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0].id));
		}
	});
};
module.exports.getFileHtml = function (id, cb) {
	const query = 'call sp_sel_pyr_evento_doc_detID( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error, intentelo de nuevo';
		} else {
			rows = rows[0];
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};

module.exports.getFilesHtml = function (id, cb) {
	const query = 'call sp_sel_pyr_evento_doc_detHTML( ? )';
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

module.exports.getAuthUsuario = function (id, cb) {
	const query = 'call sp_sel_pyr_precalificado_licitacion( ? )';
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

module.exports.postOrganizacion = function (data, cb) {
	const query = 'select fn_ins_pyr_organizacion_licitacion( ?, ? ) as id';
	connection(query, data, function (err, rows) {
		console.log(rows);
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar la organizacion, intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0].id));
		}
	});
};

module.exports.deletePrecalificado = function (id, cb) {
	const query = 'call sp_del_pyr_precalificado_licitacion( ? )';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar al precalificado, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};

module.exports.deleteConsultor = function (id, cb) {
	const query = 'call sp_del_pyr_consultor_licitacion( ? ) ';
	connection(query, id, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar eliminar al consultor, intentelo de nuevo';
		}else{
			err = 'Se elimino correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};

module.exports.postConsultor = function (data, cb) {
	const query = 'select fn_ins_pyr_consultor_licitacion( ?, ?, ?, ? ) as id';
	connection(query, data, function (err, rows) {
		console.log(rows);
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar al consultor , intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0].id));
		}
	});
};

module.exports.getSecretarioByAmbito = function (data, cb) {
	const query = 'select fn_get_num_secretarios( ?, ? ) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
		} else {
			rows = rows[0];
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
}

module.exports.getConsultores = function (id, cb) {
	const query = 'call sp_sel_pyr_consultor_licitacion( ? )';
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

module.exports.getPrecalificados = function (id, cb) {
	const query = 'call sp_sel_pyr_licitacion_precalificados( ? )';
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
}

module.exports.getFiles = function (id, cb) {
	const query = 'call sp_sel_pyr_evento_doc_det( ? )';
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

module.exports.post = function (data, cb) {
	const query = 'select fn_ins_pyr_evento( ?, ?, ?, ? ) as id';
	connection(query, data, function (err, rows) {
		let code = 0;
		if (err) {
			code = 1;
			rows = [];
			err = 'Ocurrio un error al intentar ingresar la licitacion , intentelo de nuevo';
		}else{
			err = 'Se ingreso correctamente';
		}
		if (cb) {
			cb(result(code, err, rows[0]));
		}
	});
};

module.exports.getAll = function (cb) {
	const query = 'call sp_sel_pyr_evento()';
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
