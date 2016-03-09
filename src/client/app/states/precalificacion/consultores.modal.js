'use strict';
const moment = require("moment");

module.exports = function ($scope, $uibModalInstance, Data, Utils, licitacion) {
	$scope.consultor = {};
	$scope.licitacion = licitacion;
	$scope.newConsultores = [];
	$scope.secretario = false;
	$scope.agregar = function () {
		$scope.consultor.idEvento = licitacion.id; // o idLicitacion
		Data.post('evento/consultor', $scope.consultor).then(function (result) {
			Data.toast(result);
			if (result.code === 0) {
				$scope.consultor.id = result.data;
				$scope.newConsultores.push($scope.consultor);
			}
		});
	};

	function countSecretario(id) {
		Data.get('evento/' + $scope.licitacion.id + '/secretario/' + id).then(function (result) {
			console.log(result);
			$scope.secretario = result.data > 0;
		});
	}
	Data.get('usuario').then(function (result) {
		if (result.message) {
			Data.toast(result);
			return;
		}
		// TODO: arreglar los consultores nuevos
		$scope.consultores = result.data;
		$scope.consultor.idConsultor = $scope.consultores[0].id;
	});
	Data.get('ambito').then(function (result) {
		if (result.message) {
			Data.toast(result);
			return;
		}
		$scope.ambitos = result.data;
		$scope.consultor.idAmbito = $scope.ambitos[0].id;
	});
	$scope.ok = function () {
		$uibModalInstance.close($scope.newConsultores);
	};
	$scope.$watch('consultor.idAmbito', function (newValue, oldValue) {
		if (hasVal(newValue) && newValue != oldValue) {
			countSecretario(newValue);
		}
	});
};
