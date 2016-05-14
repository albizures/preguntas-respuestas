'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('consultor_discutir', {
		url: '/consultor_discutir/:pregunta/:ambito',
		template: require('./discutir.jade')(),
		controller: require('./discutir.controller.js')
	});
};
