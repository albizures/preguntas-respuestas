'use strict';
module.exports = function ($scope, Data, $uibModalInstance, sector) {
	$scope.sector = sector;

	$scope.ok = function () {
		$uibModalInstance.close($scope.sector);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
