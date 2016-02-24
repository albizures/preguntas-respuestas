'use strict';

module.exports = function ($stateProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			template: require('./main.jade')(),
			controller: function (Auth) {}
		});
};
