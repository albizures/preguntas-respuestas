'use strict';
const templateModal = require('./roles.modal.jade')();
angular.module('app.states').controller('RolesCtrl', function ($scope, Data, $rootScope, NgTableParams, $uibModal, Utils) {
	$scope.filtro = false;
	$scope.$watch('filtro', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue) {
			if ($scope.tableRoles) {
				$scope.tableRoles.reload();
			}

		}
	});
	Data.get('rol')
		.then(function (results) {
			$scope.roles = results.data;
			$scope.tableRoles = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.roles.length,
				getData: function ($defer, params) {
					Utils.filtro($scope.roles, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.limpiar = function () {
		$scope.tableRoles.sorting({});
		$scope.tableRoles.filter({});
		$scope.filtro = false;
	};
	$scope.editar = function (id) {
		var modalroles = $uibModal.open({
			template: templateModal,
			controller: 'ModalRolesCtrl',
			resolve: {
				rol: function () {
					return $scope.roles.filter(function (rol) {
						return rol.id == id;
					})[0];
				}
			}
		});
		modalroles.result.then(function (rol) {
			Data.put('rol', rol)
				.then(function (results) {
					Data.toast(results);
					if (results.code === 0) {
						for (let index in $scope.roles) {
							if ($scope.roles[index].id == rol.id) {
								$scope.roles[index] = rol;
								$scope.tableRoles.reload();
							}
						}
					}
				});
		}, function () {});
	};
	$scope.agregar = function () {
		var modalroles = $uibModal.open({
			template: templateModal,
			controller: 'ModalRolesCtrl',
			resolve: {
				rol: function () {
					return {};
				}
			}
		});
		modalroles.result.then(function (rol) {
			Data.post('rol', rol)
				.then(function (result) {
					Data.toast(result);
					console.log(result);
					if (result.code === 0) {
						rol.id = result.data.id;
						$scope.roles.push(rol);
						$scope.tableRoles.reload();
						// if (rol.opciones && rol.opciones.length > 0) {
						// 	Data.post('permiso', {
						// 			opciones: rol.opciones,
						// 			idrol: rol.id
						// 		})
						// 		.then(function (result) {
						// 			Data.toast(result);
						// 		});
						// }
					}
				});
		});
	};
	$scope.eliminar = function (id) {
		Data.delete('rol/' + id)
			.then(function (results) {
				Data.toast(results);
				if (results.code === 0) {
					for (let index in $scope.roles) {
						if ($scope.roles[index].id == id) {
							$scope.roles.splice(index, 1);
							$scope.tableRoles.reload();
							break;
						}
					}
				}
			});
	};
});
