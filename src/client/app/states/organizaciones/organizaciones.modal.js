'use strict';
angular.module('app.states').controller('ModalOrganizacionCtrl', function ($scope, Data, Utils, $uibModalInstance, organizacion) {
	$scope.organizacion = organizacion;

	$scope.ok = function () {
		$uibModalInstance.close($scope.organizacion);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
