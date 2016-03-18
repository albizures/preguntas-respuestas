'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('visor', {
			url: '/visor/:id',
			template: require('./visor.jade')(),
			controller: require('./visor.controller.js'),
			params: {documento : null}
		});
};
