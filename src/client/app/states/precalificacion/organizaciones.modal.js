'use strict';

module.exports = function ($scope, $uibModalInstance, Data, Utils, licitacion) {
	$scope.licitacion = licitacion;
	$scope.newOrganizaciones = [];
	$scope.agregar = function () {
		$scope.organizacion.idEvento = licitacion.id; // o idLicitacion
		Data.post('evento/organizacion', $scope.organizacion)
			.then(function (result) {
				Data.toast(result);
				if (result.code === 0) {

					$scope.organizaciones = $scope.organizaciones.filter(function (item) {
						return item.id !== $scope.organizacion.id;
					}); //.splice(index, 1);
					$scope.organizacion.id =  result.data;
					$scope.newOrganizaciones.push($scope.organizacion);
					$scope.organizacion = $scope.organizaciones[0];
				}
			});
	};
	Data.get('organizacion')
		.then(function (results) {
			if (results.code !== 0) {
				Data.toast(results);
				return;
			}
			$scope.organizaciones = results.data;
			$scope.organizacion = results.data[0];
		});
	$scope.ok = function () {
		$uibModalInstance.close($scope.newOrganizaciones);
	};
};
