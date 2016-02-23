'use strict';
const mysql = require("mysql"),
		_ = require('lodash'),
		config = require('../config/environment');

let pool = mysql.createPool(_.merge(
	config.db,
	{connectionLimit : 10}
));
pool.on('enqueue', function () {
	console.log('**************************************');
	console.log('Waiting for available connection slot');
});
module.exports = function (query, data, cb) {
	if (typeof data === 'function' && typeof cb === 'function') {
		data = undefined;
	}else if (typeof cb !== 'function') {
		cb = data
		data = undefined;
	}
	pool.query(query, data, onQuery);
	function onQuery(err, rows) {
		if (err) {
			console.log(err);
		}

		if (cb){
			try {
				cb(err, rows);
			} catch (e) {
				if (config.isProduction) {
					console.log(e.stack);
				} else {
					throw e;
				}
			}
		}
	}
}
