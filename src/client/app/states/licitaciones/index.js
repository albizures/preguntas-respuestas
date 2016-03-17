'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('licitaciones', {
			url: '/licitaciones',
			template: require('./licitaciones.jade')(),
			controller: require('./licitaciones.controller.js')
		});
};
