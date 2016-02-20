'use strict';
angular.module('app.states').config(function ($stateProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			template: require('./main.jade'),
			controller: function (Auth) {}
		});
});
