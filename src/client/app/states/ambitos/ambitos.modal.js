'use strict';

module.exports = function ($scope, Data, Utils, $uibModalInstance, ambito) {
	$scope.ambito = ambito;
	$scope.ok = function () {
		$uibModalInstance.close($scope.ambito);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
