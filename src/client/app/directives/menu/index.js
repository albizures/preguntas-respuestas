'use strict';
const $ = require("jquery");
angular.module('app.directives').directive('menu', function () {
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
}).directive('menuItem', function ($compile) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			item: '=menuItem'
		},
		template: '<li ></li>',
		link: function (scope, element, attrs) {
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
});
