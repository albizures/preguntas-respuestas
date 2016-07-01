'use strict';
const $ = require("jquery");


function menuItem($compile) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			item: '=menuItem'
		},
		template: '<li></li>',
		link: function link(scope, element, attrs) {
			if (!hasVal(scope.item)) {
				return;
			}
			if (scope.item.titulo == "----------") {
				element.addClass('divider');
				element.empty();
			}
			if (scope.item.submenu) {
				//console.log('item',scope);
				element.attr('dropdown', '');
				element.addClass('btn-group');
				let text = element.children('a').text();
				element.empty();
				let $a = $('<button>' + scope.item.titulo + ' <span class="caret"></span></button>');
				element.append($a);

				let $submenu = $('<div menu="item.submenu" menu-empty="true" class="dropdown-menu"></div>');
				element.append($submenu);
			} else {
				element.addClass('submenu');
				element.attr('role', 'menuitem');
				let link = $('<a ui-sref="' + scope.item.nombre.toLowerCase() + '">' + scope.item.titulo + '</a>');
				element.append(link);
				//element.text(scope.item.titulo);
			}
			if (scope.item.click) {
				element.find('a').attr('ng-click', 'item.click()');
			}
			$compile(element.contents())(scope);
		}
	};
}

module.exports = menuItem; 