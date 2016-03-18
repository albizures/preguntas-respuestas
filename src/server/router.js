const BUILD_PATH = require("./config/environment").BUILD_PATH,
			FILES_PATH = require("./config/environment").FILES_PATH,
			path = require('path'),
			express = require('express');

function getIndex(req, res) {
	res.sendFile(path.join(BUILD_PATH, 'index.html'));
}

module.exports = function (app) {
	// TODO: mover al principio las rutas que se consideren mas utilizadas
	app.use('/api/session/', require('./api/session'));
	app.use('/api/ambito/', require('./api/ambito'));
	app.use('/api/file/', require('./api/file'));
	app.use('/api/usuario/', require('./api/usuario'));
	app.use('/api/organizacion/', require('./api/organizacion'));
	app.use('/api/rol/', require('./api/rol'));
	app.use('/api/opcion/', require('./api/opcion'));
	app.use('/api/permiso/', require('./api/permiso'));
	app.use('/api/evento/', require('./api/evento'));
	app.use('/api/pregunta/', require('./api/pregunta'));
	app.use('/api/*', function (req, res) {
		res.status(404).end();
	});

	app.use('/file/', express.static(FILES_PATH));

	app.use('/*', getIndex);
}
