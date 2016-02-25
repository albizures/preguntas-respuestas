'use strict';
module.exports = angular.module('app.services', [])
	.filter('capitalize', function () {
		return function (input, scope) {
			if (input != null) {
				input = input.toLowerCase();
				return input.substring(0, 1).toUpperCase() + input.substring(1);
			}
			return '';
		};
	}).filter('moment', function () {
		return function (input, format) {
			return moment(input).format(format);
		};
	}).name;


// injector
require('./Auth.js');
require('./Data.js');
require('./Utils.js');
// endinjector
