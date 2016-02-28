const BUILD_PATH = require("./config/environment").BUILD_PATH,
			path = require('path');

function getIndex(req, res) {
	res.sendFile(path.join(BUILD_PATH, 'index.html'));
}

module.exports = function (app) {
	app.use('/api/session/', require('./api/session'));
	app.use('/api/ambito/', require('./api/ambito'));
	app.use('/api/file/', require('./api/file'));
	app.use('/api/usuario/', require('./api/usuario'));
	app.use('/api/organizacion/', require('./api/organizacion'));
	app.use('/api/rol/', require('./api/rol'));
	app.use('/api/opcion/', require('./api/opcion'));
	app.use('/api/permiso/', require('./api/permiso'));
	app.use('/api/evento/', require('./api/evento'));
	app.use('/api/*', function (req, res) {
		res.status(404).end();
	});

	app.use('/*', getIndex);
}
