'use strict';
const moment = require("moment");
module.exports = function ($scope, $uibModalInstance, Data, Utils, evento) {
	if (evento) {
		let date = moment(evento.fecha_present_p);
		evento.dia = date.date();
		evento.mes = date.month();
		evento.anio = date.year();
	} else {
		evento = {};
		evento.diaI = evento.diaF = $scope.today.day;
		evento.mesI = evento.mesF = $scope.today.month;
		evento.anioI = evento.anioF = $scope.today.year;

	}
	$scope.evento = evento;
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.ok = function () {
		$scope.evento.fecha_inicio = moment([$scope.evento.anioI, $scope.evento.mesI, $scope.evento.diaI]).format();
		$scope.evento.fecha_final = moment([$scope.evento.anioF, $scope.evento.mesF, $scope.evento.diaF]).format();
		$uibModalInstance.close($scope.evento);
	};
};
