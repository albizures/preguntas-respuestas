'use strict';
const templateModal = require('./sectores.modal.jade')(),
	CtrlModal = require('./sectores.modal.js');
module.exports = function ($scope, Data, Utils, $uibModal, NgTableParams) {
	Data.get('sector').then(function (result) {
		if (result.code != 0) {
			Data.toast(result);
			return;
		}
		$scope.sectores = result.data;
		table();
	});

	function table() {
		if ($scope.tableSectores) {
			return $scope.tableSectores.reload();
		}

		$scope.tableSectores = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
			total: $scope.sectores.length,
			getData: function ($defer, params) {
				Utils.filtro($scope.sectores, $scope.filtro, params, $defer);
			}
		});
	}
	$scope.limpiar = function () {
		$scope.tableSectores.sorting({});
		$scope.tableSectores.filter({});
		$scope.filtro = false;
	};
	$scope.agregar = function () {
		var modalSectores = $uibModal.open({
			template: templateModal,
			controller: CtrlModal,
			backdrop: 'static',
			resolve: {
				sector: function () {
					return undefined;
				}
			}
		});
		modalSectores.result.then(function (sector) {
			Data.post('sector', sector).then(function (results) {
				if (results.code === 0) {
					sector.id = Number(results.data.id);
					$scope.sectores.push(sector);
					table();
				}
				Data.toast(results);
			});
		});
	};
	$scope.eliminar = function (id) {
		$scope.confirm('Desea eliminar el sector?', confirm);

		function confirm(result) {
			if (!result) {
				return;
			}
			Data.delete('sector/' + id).then(function (result) {
				Data.toast(result);
				if (result.code == 0) {
					for (let index = 0; index < $scope.sectores.length; index++) {
						if ($scope.sectores[index].id == id) {
							$scope.sectores.splice(index, 1);
							table();
							return;
						}
					}
				}

			});
		}
	};
};
