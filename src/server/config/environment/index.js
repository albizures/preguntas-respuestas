const path = require('path'),
	_ = require('lodash'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
	ROOT_PATH = path.join(__dirname,'..' , '..', '..', '..'),
	BUILD_PATH = path.join(ROOT_PATH, 'dist'),
	CLIENT_PATH = path.join(ROOT_PATH, 'src', 'client'),
	APP_PATH = path.join(CLIENT_PATH, 'app', 'index.js'),
	MODULES_PATH = path.join(ROOT_PATH, 'node_modules'),
	ASSETS_PATH = path.join(CLIENT_PATH, 'assets'),
	all = {
		isProduction : env === 'production',
		ROOT_PATH,
		BUILD_PATH,
		CLIENT_PATH,
		APP_PATH,
		MODULES_PATH,
		ASSETS_PATH,
		PORT : 8080,
		secret : '9482af1dce452c46'
	};
//require('crypto').randomBytes(8).toString('hex');
module.exports = _.merge(
	all,
	require('./' + env + '.js')
);
