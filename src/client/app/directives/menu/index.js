'use strict';
const $ = require("jquery");
module.exports = function menu() {
	return {
		restrict: 'A',
		scope: {
			menu: '=menu',
			cls: '=ngClass',
			empty: '@menuEmpty'
		},
		replace: true,
		template: require('./menu.jade')(),
		link: function (scope, element, attrs) {
			element.addClass(attrs.class);
			element.addClass(scope.cls);
		}
	};
};
