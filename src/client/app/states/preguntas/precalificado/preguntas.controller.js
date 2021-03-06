'use strict';
const moment = require("moment");

module.exports = function ($scope, Data, Utils, NgTableParams, $stateParams) {
	Data.get('pregunta/evento/' + $stateParams.id + '/precalificado').then(function (result) {
		if (result.code != 0) {
			Data.toast(result);
			return;
		}
		for (let i = 0; i < result.data.length; i++) {
			if (result.data[i].estado == 1) {
				result.data[i].est = 'Ingresada';
			} else if (result.data[i].estado == 2) {
				result.data[i].est = 'En revision';
			} else if (result.data[i].estado == 3) {
				result.data[i].est = 'Respondida';
			} else if (result.data[i].estado == 4) {
				result.data[i].est = 'Para postear';
			} else if (result.data[i].estado == 5) {
				result.data[i].est = 'Finalizada';
			}
		}
		$scope.preguntas = result.data;
		table();
	});

	function table() {
		if ($scope.tablePreguntas) {
			return $scope.tablePreguntas.reload();
		}

		$scope.tablePreguntas = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
			total: $scope.preguntas.length,
			getData: function ($defer, params) {
				Utils.filtro($scope.preguntas, $scope.filtro, params, $defer);
			}
		});
	}
	$scope.limpiar = function () {
		$scope.tablePreguntas.sorting({});
		$scope.tablePreguntas.filter({});
		$scope.filtro = false;
	};
	$scope.getColor = function (fecha, estado) {
		var color = '',
			diff = moment().diff(fecha, 'hours');
		if (estado != 2 && estado != 1) {
			return;
		}
		fecha = moment(fecha);
		if (diff >= 0 && 36 >= diff) {
			color = 'success';
		} else if (diff > 36 && 60 >= diff) {
			return 'warning';
		} else if (diff > 60 && 72 >= diff) {
			return 'danger';
		} else {
			return 'active';
		}
		return color;
	};
};
