'use strict';
const templateModal = require('./licitaciones.modal.jade')(),
	ctrlModal = require('./licitaciones.modal.js'),
	templateModalDocumentos = require('../documentos.modal.jade')(),
	ctrlModalDocumentos = require('./documentos.modal.js');
module.exports = function ($uibModal, $scope, Data, NgTableParams, Utils) {
	Data.get('evento')
		.then(function (results) {
			if (results.code !== 0) {
				Data.toast(results);
				return;
			}
			$scope.licitaciones = results.data;
			$scope.tableLicitaciones = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.licitaciones.length,
				getData: function ($defer, params) {
					Utils.filtro($scope.licitaciones, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.limpiar = function () {
		$scope.tableProyectos.sorting({});
		$scope.tableProyectos.filter({});
		$scope.filtro = false;
	};
	$scope.documentos = function (licitacion) {
		var modalDocumentos = $uibModal.open({
			template: templateModalDocumentos,
			controller: ctrlModalDocumentos,
			backdrop: 'static',
			resolve: {
				licitacion: function () {
					return licitacion;
				},
				cargar: function () {
					return true;
				}
			}
		});
	};
	$scope.agregar = function () {
		var modalEventos = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			//size : 'lg',
			backdrop: 'static',
			resolve: {
				evento: function () {
					return undefined;
				}
			}
		});
		modalEventos.result.then(function (evento) {
			Data.post('evento', evento)
				.then(function (results) {
					if (results.code === 0) {
						//debugger;
						console.log(results.data.id, results.data.id, results.data);
						evento.id = results.data.id;
						$scope.licitaciones.push(evento);
						$scope.tableLicitaciones.reload();
					}
					Data.toast(results);
				});
		});
	};
};
