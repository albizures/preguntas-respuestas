const path = require('path'),

	ROOT_PATH = path.join(__dirname,'..' , '..', '..'),
	BUILD_PATH = path.join(ROOT_PATH, 'dist'),
	CLIENT_PATH = path.join(ROOT_PATH,'src', 'client'),
	APP_PATH = path.join(CLIENT_PATH,'app', 'index.js'),
	MODULES_PATH = path.join(ROOT_PATH, 'node_modules'),
	ASSETS_PATH = path.join(CLIENT_PATH, 'assets');
module.exports = {
	ROOT_PATH,
	BUILD_PATH,
	CLIENT_PATH,
	APP_PATH,
	MODULES_PATH,
	ASSETS_PATH,
	PORT : 8080
}
module.exports.secret = require('crypto').randomBytes(8).toString('hex');
