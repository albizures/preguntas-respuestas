'use strict';
console.log(require('./usuarios.controller.js'));
angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('usuarios', {
			url: '/usuarios',
			template: require('./usuarios.jade'),
			controller: require('./usuarios.controller.js')
		});
});
