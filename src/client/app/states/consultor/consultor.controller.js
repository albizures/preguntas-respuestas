'use strict';
const templateModal = require('../documentos.modal.jade')(),
		ctrlModal = require('./documentos.modal.js');

module.exports = function ($uibModal, $scope, Data, NgTableParams, Utils) {
	Data.get('evento/precalificado')
		.then(function (results) {
			if (results.code != 0) {
				Data.toast(results);
				return;
			}
			console.log(results);
			$scope.licitaciones = results.data;
			$scope.tableLicitaciones = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.licitaciones.length,
				filterDelay: 350,
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
			template: templateModal,
			controller: ctrlModal,
			backdrop: 'static',
			resolve: {
				licitacion: function () {
					return licitacion;
				},
				cargar: function () {
					return false;
				}
			}
		});
	};
};
