'use strict';
console.log(require('./opciones.controller.js'));
module.exports = function ($stateProvider) {
	$stateProvider
		.state('opciones', {
			url: '/opciones',
			template: require('./opciones.jade')(),
			controller: require('./opciones.controller.js')
		});
};
