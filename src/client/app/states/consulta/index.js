'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('consulta', {
			url: '/consulta',
			template: require('./consulta.jade')(),
			controller: require('./consulta.controller.js')
		});
};
