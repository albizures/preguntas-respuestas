'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('preguntas_precalificado', {
		url: '/preguntas/licitacion/:id/precalificado',
		template: require('./preguntas.jade')(),
		controller: require('./preguntas.controller.js')
	});
};
