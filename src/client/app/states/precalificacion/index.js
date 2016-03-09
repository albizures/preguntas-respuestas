'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('precalificacion', {
		url: '/precalificacion',
		template: require('./precalificacion')(),
		controller: require('./precalificacion.controller.js')
	});
};
