'use strict';


function anBack($window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {
				$window.history.back();
			});
		}
	};
}
module.exports = anBack;
