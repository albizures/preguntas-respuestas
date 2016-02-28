'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('consultor', {
			url: '/consultor',
			template: require('./consultor.jade')(),
			controller: require('./consultor.controller.js')
		});
};
