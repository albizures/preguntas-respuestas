'use strict';
angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('organizaciones', {
			url: '/organizaciones',
			template: require('./organizaciones.jade'),
			controller:  'OrganizacionCtrl'
		});
});
