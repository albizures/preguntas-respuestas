'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('organizaciones', {
			url: '/organizaciones',
			template: require('./organizaciones.jade')(),
			controller: require('./organizaciones.controller.js')
		});
};
