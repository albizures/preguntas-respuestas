'use strict';
const templateModal = require('./opciones.modal.jade')(),
		ctrlModal = require('./opciones.modal.js');
module.exports = function ($scope, Data, $rootScope, NgTableParams, $uibModal, Utils) {
	$scope.filtro = false;
	$scope.$watch('filtro', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue) {
			if ($scope.tableOpciones) {
				$scope.tableOpciones.reload();
			}

		}
	});
	Data.get('opcion')
		.then(function (result) {
			$scope.opciones = result.data;
			for (let index in $scope.opciones) {

				$scope.opciones[index].tipo = {
					codTipo: $scope.opciones[index].codTipo,
					id: $scope.opciones[index].idTipo,
					nombreTipo: $scope.opciones[index].nombreTipo
				};
			}
			$scope.tableOpciones = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.opciones.length,
				filterDelay: 350,
				getData: function ($defer, params) {
					Utils.filtro($scope.opciones, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.limpiar = function () {
		$scope.tableOpciones.sorting({});
		$scope.tableOpciones.filter({});
		$scope.filtro = false;
	};
	$scope.editar = function (id) {
		var modalOpciones = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			resolve: {
				opcion: function () {
					return $scope.opciones.filter(function (opcion) {
						return opcion.id == id;
					})[0];
				}
			}
		});
		modalOpciones.result.then(function (opcion) {
			Data.put('opcion', opcion)
				.then(function (result) {
					if (result.code === 0) {
						for (let index in $scope.opciones) {
							if ($scope.opciones[index].id == opcion.id) {
								$scope.opciones[index] = opcion;
								$scope.tableOpciones.reload();
							}
						}
					}
					Data.toast(result);
				});
		}, function () {});
	};
	$scope.agregar = function () {
		var modalOpciones = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			resolve: {
				opcion: function () {
					return {};
				}
			}
		});
		modalOpciones.result.then(function (opcion) {
			Data.post('opcion', opcion)
				.then(function (result) {
					if (result.code === 0) {
						//debugger;
						console.log(result.data.id, result.data.id, result.data);
						opcion.id = result.data.id;
						$scope.opciones.push(opcion);
						$scope.tableOpciones.reload();
					}
					Data.toast(result);
				});
		});
	};
	$scope.eliminar = function (id) {
		Data.delete('opcion/' + id)
			.then(function (result) {
				Data.toast(result);
				if (result.code == 0) {
					for (let index in $scope.opciones) {
						if ($scope.opciones[index].id == id) {
							$scope.opciones.splice(index, 1);
							$scope.tableOpciones.reload();
							break;
						}
					}
				}
			});
	};
};
