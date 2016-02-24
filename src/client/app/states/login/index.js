'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			template: require('./login.jade')(),
			controller: require('./login.js') // TODO: cambiarle el nombre al archivo del controller
		});
};
