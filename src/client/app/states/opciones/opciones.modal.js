'use strict';

module.exports = function ($scope, $uibModalInstance, opcion, Data, tipoMenu, Utils) {
	$scope.padres = undefined;
	if (opcion.idTipo !== undefined) {
		let id = tipoMenu[opcion.idTipo];
		if (id !== false) {
			id = 1; //se cambio al tipo de opcion para traer todos los menus
			Data.get('opcion/type/' + id)
				.then(function (result) {
					$scope.padres = result.data;
				});
		}
	}

	Data.get('opcion/types')
		.then(function (result) {
			$scope.tipos = result.data;
		});

	$scope.opcion = angular.copy(opcion);
	if (!$scope.opcion.idTipo) {
		$scope.opcion.idTipo = 1;
	}
	console.log(opcion);
	/*$scope.tipos = [
	    {id : 1,nombreTipo : 'Menu'}
	];*/
	$scope.ok = function () {
		if ($scope.opcion.nombreTipo == undefined) {
			$scope.opcion.nombreTipo = $scope.tipos.filter(function (tipo) {
				return tipo.id == $scope.opcion.idTipo;
			})[0].nombreTipo;
		}
		if ($scope.opcion.idPadre == undefined || $scope.opcion.idPadre == null || $scope.opcion.idPadre == "") {
			$scope.opcion.idPadre = 0;
		}
		$uibModalInstance.close($scope.opcion);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.$watch('opcion.idTipo', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue && (!$scope.padres || $scope.opcion.idTipo != $scope.padres[0].id)) {
			let id = tipoMenu[$scope.opcion.idTipo];
			if (id !== false) {
				Data.get('opcion/type/' + id)
					.then(function (result) {
						console.log(result, id, $scope.opcion.idTipo);
						for (let index in result.data) {
							if (result.data[index].id == $scope.opcion.id) {
								result.data.splice(index, 1);
							}
						}
						$scope.padres = result.data;
						$scope.opcion.idPadre = $scope.padres[0].id;
					});
			} else {
				$scope.padres = undefined;
			}
		} else {
			$scope.padres = undefined;
		}
	});
};
