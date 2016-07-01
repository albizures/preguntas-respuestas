const express = require('express'),
	jwt = require('express-jwt'),
	config = require('./environment'),
	livereload = require('express-livereload'),
	bodyParser = require('body-parser'),
	secret = require('./environment').secret,
	BUILD_PATH = config.BUILD_PATH,
	favicon = require('serve-favicon');

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(express.static(BUILD_PATH));
	app.use('/uploads/',express.static(config.FILES_PATH));
	app.use(favicon('src/favicon.ico'));
	app.use(/*'/api/',*/ jwt({
		secret: secret,
		fail: function (req, res, next) {
			if (!req.headers.authorization) res.send(400, 'missing authorization header');
			res.send(401);
		}
	}).unless({
		//method: 'POST',
		path: ['/api/session/']
	}));
	if (!config.isProduction) {
		app.use(function (err, req, res, next) {return next();});
		livereload(app, {
			port: '35730',
			watchDir: BUILD_PATH
		});
	}
}
