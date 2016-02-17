'use strict';
angular.module('app').controller('NavbarCtrl', function ($scope, $location, $rootScope, Auth, $uibModal) {

	$rootScope.$watch('opciones', function () {
		//console.log($rootScope.opciones); // alert('cambio');
	});
	$scope.usuario = $rootScope.usuario;
	$scope.logout = function () {
		Auth.logout(function () {
			$location.path('/login');
		});
	};
	$scope.cambiarPass = function () {
		$uibModal.open({
			templateUrl: 'modal.pass',
			controller: 'PassCtrl',
			size: 'sm',
			resolve: {
				administrador: function () {
					return false;
				},
				usuario: function () {
					return undefined;
				}
			}
		});
	};
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		//console.log(toState.name,toState.name);
		$rootScope.ImgEvento = (toState.name == 'visor' || toState.name == 'consulta') ? $rootScope.ImgEvento : '';
		//console.log($rootScope.ImgEvento,toState.name == 'visor' || toState.name == 'consulta');
		//$rootScope.$applyAsync();
		$rootScope.mostrarImg = toState.name == 'visor' || toState.name == 'consulta';
	});
	$scope.menu = [{
		"title": "Home",
		"href": "#"
	}, {
		"title": "About",
		"href": "about"
	}, {
		"title": "History",
		"href": "about/history"
	}, {
		"title": "Contact",
		"href": "contact"
	}, {
		"title": "Other things - in a list. (Click here)",
		"submenu": [{
			"header": "Sample Header"
		}, {
			"title": "Some Link",
			"href": "some/place"
		}, {
			"title": "Another Link",
			"href": "some/other/place"
		}, {
			"divider": "true"
		}, {
			"header": "Header 2"
		}, {
			"title": "Again...a link.",
			"href": "errrr"
		}, {
			"title": "Nest Parent",
			"submenu": [{
				"title": "nested again",
				"href": "nested/again"
			}, {
				"title": "me too",
				"href": "sample/place"
			}]
		}]
	}];
});
