const express = require('express'),
	jwt = require('express-jwt'),
	livereload = require('express-livereload'),
	bodyParser = require('body-parser'),
	secret = require('./index.js').secret,
	BUILD_PATH = require('./index.js').BUILD_PATH,
	favicon = require('serve-favicon');

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(express.static(BUILD_PATH));
	app.use(favicon('src/favicon.ico'));
	app.use('/api/', jwt({
		secret: secret,
		fail: function (req, res, next) {
			if (!req.headers.authorization) res.send(400, 'missing authorization header');
			res.send(401);
		}
	}).unless({
		method: 'POST',
		path: ['/api/session/']
	}));
	app.use(function (err, req, res, next) {return next();});
	livereload(app, {
		port: '35730',
		watchDir: BUILD_PATH
	});
}
