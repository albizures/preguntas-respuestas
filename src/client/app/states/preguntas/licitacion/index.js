'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('preguntas_licitacion', {
		url: '/preguntas/licitacion/:id',
		template: require('./preguntas.jade')(),
		controller: require('./preguntas.controller.js')
	});
};
