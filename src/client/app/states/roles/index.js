'use strict';

console.log(require('./roles.controller.js'));
module.exports = function ($stateProvider) {
	$stateProvider
		.state('roles', {
			url: '/roles',
			template: require('./roles.jade')(),
			controller: require('./roles.controller.js')
		});
};
