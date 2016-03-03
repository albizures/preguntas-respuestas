'use strict';
const templateModal = require('./organizaciones.modal.jade')(),
	ctrlModal = require('./organizaciones.modal.js');
module.exports = function ($scope, Data, $rootScope, NgTableParams, $uibModal, Utils) {
	$scope.filtro = false;
	$scope.$watch('filtro', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue) {
			if ($scope.tableOrganizacion) {
				$scope.tableOrganizacion.reload();
			}

		}
	});
	Data.get('organizacion')
		.then(function (results) {
			$scope.organizacion = results.data;
			console.log($scope.organizacion);
			$scope.tableOrganizacion = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.organizacion.length,
				getData: function ($defer, params) {
					Utils.filtro($scope.organizacion, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.limpiar = function () {
		$scope.tableOrganizacion.sorting({});
		$scope.tableOrganizacion.filter({});
		$scope.filtro = false;
	};
	$scope.editar = function (id) {
		var modalorganizacion = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			resolve: {
				rol: function () {
					return $scope.roles.filter(function (organizacion) {
						return organizacion.id == id;
					})[0];
				}
			}
		});
		modalorganizacion.result.then(function (rol) {
			Data.put('organizacion', {
					organizacion: organizacion
				})
				.then(function (results) {
					if (results.status === "info") {
						for (index in $scope.organizacion) {
							if ($scope.organizacion[index].id == organizacion.id) {
								$scope.organizacion[index] = organizacion;
								$scope.tableOrganizacion.reload();
							}
						}
					}
					Data.toast(results);
				});
		}, function () {});
	};
	$scope.agregar = function () {
		var modalorganizacion = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			backdrop: 'static',
			resolve: {
				organizacion: function () {
					return {};
				}
			}
		});
		modalorganizacion.result.then(function (organizacion) {
			Data.post('organizacion', {
					'nombre': organizacion.nombre
				})
				.then(function (results) {
					if (results.code === 1) {
						organizacion.id = results.data.id;
						$scope.organizacion.push(organizacion);
						$scope.tableOrganizacion.reload();
					}
					Data.toast(results);
				});
		});
	};
	$scope.eliminar = function (id) {
		Data.delete('organizacion/' + id)
			.then(function (results) {
				Data.toast(results);
				if (results.code === 0) {
					for (let index in $scope.organizacion) {
						if ($scope.organizacion[index].id == id) {
							$scope.organizacion.splice(index, 1);
							$scope.tableOrganizacion.reload();
							break;
						}
					}
				}
			});
	};
};
