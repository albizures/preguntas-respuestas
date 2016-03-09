'use strict';
const templateModalOrg = require('./organizaciones.modal.jade')(),
	ctrlModalOrg = require('./organizaciones.modal.js'),
	templateModalCon = require('./consultores.modal.jade')(),
	ctrlModalCon = require('./consultores.modal.js');

// TODO: cambiar el nombre del arreglo $scope.usuarios a precalificados
module.exports = function ($scope, Data, $rootScope, NgTableParams, $uibModal, Utils) {
	$scope.tipoPrecalificado = '1';
	Data.get('evento').then(function (results) {
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

	$scope.$watch('tipoPrecalificado', function (newValue, oldValue) {
		if (!$scope.licitacionSel) {
			return;
		}
		if (newValue == 1) {
			actualizarUsuarios(true);
		} else {
			actualizarConsultores(true);
		}
	});
	$scope.selLicitacion = function (licitacion) {
		$scope.licitacionSel = licitacion;
		if ($scope.tipoPrecalificado == 1) {
			actualizarUsuarios(true);
		} else {
			actualizarConsultores(true);
		}
	};

	function actualizarUsuarios(cambiar) {
		if (hasVal($scope.tablePrecalificados) && !cambiar) {
			return $scope.tablePrecalificados.reload();
		}
		Data.get('evento/' + $scope.licitacionSel.id + '/precalificados').then(function (results) {
				if (results.code !== 0) {
					Data.toast(results);
					$scope.usuarios = [];
					$scope.tablePrecalificados.reload();
					return;
				}
				$scope.usuarios = results.data;
				if (hasVal($scope.tablePrecalificados)) {
					return $scope.tablePrecalificados.reload();
				}
				$scope.tablePrecalificados = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
					total: $scope.usuarios.length,
					getData: function ($defer, params) {
						Utils.filtro($scope.usuarios, $scope.filtro2, params, $defer);
					}
				});
			});
	}

	function actualizarConsultores(cambiar) {
		if (hasVal($scope.tableConsultores) && !cambiar) {
			return $scope.tableConsultores.reload();
		}
		Data.get('evento/' + $scope.licitacionSel.id + '/consultores')
			.then(function (results) {
				//console.log(results);
				if (results.code !== 0) {
					Data.toast(results);
					$scope.consultores = [];
					$scope.tableConsultores.reload();
					return;
				}
				$scope.consultores = results.data;
				if (hasVal($scope.tableConsultores)) {
					return $scope.tableConsultores.reload();
				}
				$scope.tableConsultores = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
					total: $scope.consultores.length,
					getData: function ($defer, params) {
						Utils.filtro($scope.consultores, $scope.filtro3, params, $defer);
					}
				});
			});
	}
	$scope.agregarOrganizacion = function () {
		if (!hasVal($scope.licitacionSel)) {
			return Data.toast({
				code: 3,
				description: 'Seleccione un evento de licitacion'
			});
		}
		let modal = $uibModal.open({
			template: templateModalOrg,
			controller: ctrlModalOrg,
			backdrop: 'static',
			resolve: {
				licitacion: function () {
					return $scope.licitacionSel;
				}
			}
		});
		modal.result.then(function (newUsuarios) {
			if (!hasVal(newUsuarios)) {
				return;
			}
			if (!hasVal($scope.usuarios)) {
				$scope.usuarios = [];
			}
			//$scope.usuarios = $scope.usuarios.concat(newUsuarios);
			actualizarUsuarios(true);
		});
	};
	$scope.agregarConsultores = function () {
		if (!hasVal($scope.licitacionSel)) {
			return Data.toast({
				status: 'info',
				message: 'Seleccione un evento de licitacion'
			});
		}
		let modal = $uibModal.open({
			template: templateModalCon,
			controller: ctrlModalCon,
			backdrop: 'static',
			resolve: {
				licitacion: function () {
					return $scope.licitacionSel;
				}
			}
		});
		modal.result.then(function (newUsuarios) {
			if (!hasVal(newUsuarios)) {
				return;
			}
			if (!hasVal($scope.consultores)) {
				$scope.consultores = [];
			}
			//$scope.usuarios = $scope.usuarios.concat(newUsuarios);
			actualizarConsultores(true);
		});
	};
	$scope.eliminar = function (elemento, tipo) {

		console.log(tipo, elemento.id);

		$scope.confirm('Desea eliminar al ' + tipo, confirm);

		function confirm(result) {
			let ruta = 'evento/', arreglo;
			if (tipo == 'precalificado') {
				ruta += 'precalificado/' + elemento.id;
				arreglo = 'usuarios';
			} else {
				ruta += 'consultor/' + elemento.id;
				arreglo = 'consultores';
			}
			if (!result) {
				return;
			}

			Data.delete(ruta).then(function (result) {
				Data.toast(result);
				if (result.code == 0) {
					for (let i = 0; i < $scope[arreglo].length; i++) {
						if ($scope[arreglo][i].id == elemento.id) {
							$scope[arreglo].splice(i, 1);
							tipo == 'precalificado' ? actualizarUsuarios() : actualizarConsultores();
							return;
						}
					}
				}
			});
		}
	};
};
