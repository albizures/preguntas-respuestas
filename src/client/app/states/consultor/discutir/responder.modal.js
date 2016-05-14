'use strict';

module.exports = function ($scope, Data, Utils, $uibModalInstance, pregunta) {
	$scope.uploading = false;

	$scope.pregunta = pregunta;
	$scope.responder = function () {
		Data.post('pregunta/respuesta', {
			pregunta : pregunta.id,
			respuesta : pregunta.respuesta
		}).then(function (result) {
			if (result.code == 0) {
				$uibModalInstance.close($scope.pregunta);
			}
			Data.toast(result);
		});
	};
	$scope.ok = function () {
		$uibModalInstance.close($scope.pregunta);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};