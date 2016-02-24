'use strict';
angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('roles', {
			url: '/roles',
			template: require('./roles.jade'),
			controller: require('./roles.controller.js')
		});
});
