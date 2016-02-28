'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('ambitos', {
			url: '/ambitos',
			template: require('./ambitos.jade')(),
			controller: require('./ambitos.controller.js')
		});
};
