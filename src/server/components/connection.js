const mysql = require("mysql");

var pool = mysql.createPool({
	connectionLimit : 10,
	database : 'db_anadie',
	host : 'localhost',
	user : 'root',
	password : ''
});
pool.on('enqueue', function () {
	console.log('**************************************');
	console.log('Waiting for available connection slot');
});
module.exports = function (query, data, cb) {
	if (!cb) {
		cb = data;
	}
	pool.query(query, data, onQuery);
	function onQuery(err, rows) {
		if (cb){
			cb(err, rows);
		}
	}
}
