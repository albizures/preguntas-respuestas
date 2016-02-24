'use strict';
module.exports = function ($scope, Data, Utils, $uibModalInstance, organizacion) {
	$scope.organizacion = organizacion;

	$scope.ok = function () {
		$uibModalInstance.close($scope.organizacion);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
