'use strict';

module.exports = function ($scope, $uibModalInstance, msg) {
	$scope.msg = msg;
	$scope.ok = function (result) {
		$uibModalInstance.close(result);
	};
};
