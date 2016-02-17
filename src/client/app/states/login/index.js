'use strict';

angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			template: require('./login.jade')(),
			controller: 'LoginCtrl'
		});
});
