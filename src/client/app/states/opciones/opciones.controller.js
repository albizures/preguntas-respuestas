'use strict';
const templateModal = require('./opciones.modal.jade')(),
		CtrlOpciones = require('./opciones.modal.js');
module.exports = function ($scope, Data, $rootScope, NgTableParams, $filter, $uibModal, Utils) {
	$scope.filtro = false;
	$scope.$watch('filtro', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue) {
			if ($scope.tableOpciones) {
				$scope.tableOpciones.reload();
			}

		}
	});
	Data.get('usuario')
		.then(function (results) {
			$scope.usuarios = results.data;
			$scope.tableUsuarios = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.usuarios.length,
				getData: function ($defer, params) {
					Utils.filtro($scope.usuarios, $scope.filtro, params, $defer);
				}
			});
		});
	Data.get('opcion')
		.then(function (results) {
			$scope.opciones = results.data;
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
		var modalOpciones = $modal.open({
			template: templateModal,
			controller: CtrlOpciones,
			resolve: {
				opcion: function () {
					return $scope.opciones.filter(function (opcion) {
						return opcion.id == id;
					})[0];
				}
			}
		});
		modalOpciones.result.then(function (opcion) {
			Data.post('opDatosU', {
					'opcion': opcion
				})
				.then(function (results) {
					if (results.status === "info") {
						for (index in $scope.opciones) {
							if ($scope.opciones[index].id == opcion.id) {
								$scope.opciones[index] = opcion;
								$scope.tableOpciones.reload();
							}
						}
					}
					Data.toast(results);
				});
		}, function () {});
	};
	$scope.agregar = function () {
		var modalOpciones = $modal.open({
			template: templateModal,
			controller: CtrlOpciones,
			resolve: {
				opcion: function () {
					return {};
				}
			}
		});
		modalOpciones.result.then(function (opcion) {
			Data.post('opDatos', {
					'opcion': opcion
				})
				.then(function (results) {
					if (results.status === "success") {
						//debugger;
						console.log(Number(results.data.id), results.data.id, results.data);
						opcion.id = Number(results.data.id);
						$scope.opciones.push(opcion);
						$scope.tableOpciones.reload();
					}
					Data.toast(results);
				});
		});
	};
	$scope.eliminar = function (id) {
		Data.get('opDatosD/' + id)
			.then(function (results) {
				for (index in $scope.opciones) {
					if ($scope.opciones[index].id == id) {
						$scope.opciones.splice(index, 1);
						$scope.tableOpciones.reload();
						Data.toast(results);
						break;
					}
				}

			});
	};
};
