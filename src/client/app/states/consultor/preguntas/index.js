'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('consultor_preguntas', {
		url: '/consultor_preguntas/:evento/:ambito',
		template: require('./preguntas.jade')(),
		controller: require('./preguntas.controller.js')
	});
};
