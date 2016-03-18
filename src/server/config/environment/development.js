const path = require('path'),
	ROOT_PATH = path.join(__dirname,'..' , '..', '..', '..');
module.exports = {
	FILES_PATH : path.join(ROOT_PATH, 'uploads')
};
module.exports.db = {
	database : 'db_anadie',
	host : 'localhost',
	user : 'root',
	password : ''
};
