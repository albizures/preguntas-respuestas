'use strict';
console.log(require('./usuarios.controller.js'));
module.exports = function ($stateProvider) {
	$stateProvider
		.state('usuarios', {
			url: '/usuarios',
			template: require('./usuarios.jade')(),
			controller: require('./usuarios.controller.js')
		});
};
