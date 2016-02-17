'use strict';

const connection = require("../../components/connection.js");

module.exports.session = function (data, cb) {
	let query = "call sp_sel_opciones_menu( ? )";
	connection(query, data.id, function (err,rows) {
		let opciones = [];
		if(!err && rows && rows[0]){
			opciones = rows[0];
		}
		data.opciones = opciones;
		if (cb) {
			cb(data);
		}
	});
};
module.exports.getUsuario = function (username, cb) {
	let query = "call sp_sel_seg_usuario(?)";
	connection(query, username, function (err, rows) {
		if(cb) cb(err, rows);
	});
};
module.exports.logout = function (data, cb) {

};
