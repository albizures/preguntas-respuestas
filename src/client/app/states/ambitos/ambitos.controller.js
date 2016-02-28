'use strict';
const templateModal = require('./ambitos.modal.jade')(),
		ctrlModal = require('./ambitos.modal.js');
module.exports = function ($scope, Data, Utils, $uibModal, $rootScope, NgTableParams) {
	Data.get('ambito')
		.then(function (result) {
			if (result.code !== 0) {
				Data.toast(result);
				return;
			}
			$scope.ambitos = result.data;
			table();
		});

	function table() {
		if ($scope.tableAmbitos) {
			return $scope.tableAmbitos.reload();
		}

		$scope.tableAmbitos = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
			total: $scope.ambitos.length,
			filterDelay: 350,
			getData: function ($defer, params) {
				Utils.filtro($scope.ambitos, $scope.filtro, params, $defer);
			}
		});
	}
	$scope.limpiar = function () {
		$scope.tableAmbitos.sorting({});
		$scope.tableAmbitos.filter({});
		$scope.filtro = false;
	};
	$scope.agregar = function () {
		var modalAmbitos = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			backdrop: 'static',
			resolve: {
				ambito: function () {
					return undefined;
				}
			}
		});
		modalAmbitos.result.then(function (ambito) {
			Data.post('ambito', {
					'nombre': ambito.nombre,
					'codigo': ambito.codigo
				})
				.then(function (results) {
					if (results.code ==  0) {
						ambito.id = results.data.id;
						$scope.ambitos.push(ambito);
						table();
					}
					Data.toast(results);
				});
		});
	};

	$scope.eliminar = function (id) {
		$scope.confirm('Desea eliminar el ámbito?', confirm);

		function confirm(result) {
			if (!result) {
				return;
			}
			Data.delete('ambito/' + id)
				.then(function (result) {
					Data.toast(result);
					if (result.code === 0) {
						for (let index in $scope.ambitos) {
							if ($scope.ambitos[index].id == id) {
								$scope.ambitos.splice(index, 1);
								table();
								return;
							}
						}
					}

				});
		}
	};
};
