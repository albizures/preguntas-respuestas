'use strict';

module.exports = function ($stateProvider) {
	$stateProvider.state('sectores', {
			url: '/sectores',
			template: require('./sectores.jade')(),
			controller: require('./sectores.controller.js')
		});
};
