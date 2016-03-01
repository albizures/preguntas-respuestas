'use strict';

module.exports = function anBack($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				$window.history.back();
			});
		}
	};
};
