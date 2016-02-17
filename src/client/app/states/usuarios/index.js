'use strict';
angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('usuarios', {
			url: '/usuarios',
			template: require('./usuarios.jade'),
			controller: 'UsuariosCtrl'
		});
});
