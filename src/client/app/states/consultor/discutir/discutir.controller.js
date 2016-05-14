'use strict';
const templateModal = require('./responder.jade')(),
	ctrlModal = require('./responder.modal.js');
module.exports = function ($uibModal, $scope, Data, Utils, $stateParams) {

	console.log($stateParams);

	Data.get('pregunta/' + $stateParams.pregunta + '/ambito/' + $stateParams.ambito).then(function (result) {
		if (result.code !== 0) {
			Data.toast(result);
			return;
		}
		$scope.pregunta = result.data && result.data[0];
		traerComentario();
	});

	function traerComentario() {
		Data.get('pregunta/' + $stateParams.pregunta + '/comentarios/ambito/' + $stateParams.ambito).then(function (result) {
			if (result.code !== 0) {
				Data.toast(result);
				return;
			}
			$scope.pregunta.comentarios = result.data;
		});
	}

	$scope.comentar = function () {
		Data.post('pregunta/comentario', {
			pregunta: $scope.pregunta.id,
			ambito: $scope.pregunta.id_ambito,
			comentario: $scope.pregunta.newComentario
		}).then(function (result) {
			Data.toast(result);
			if (result.code == 0) {
				traerComentario();
			}
		});
	};
	$scope.responder = function () {
		var modalResponder = $uibModal.open({
			template: templateModal,
			controller: ctrlModal,
			backdrop: 'static',
			resolve: {
				pregunta: function () {
					return $scope.pregunta;
				}
			}
		});
		modalResponder.result.then(function (ice) {

		});
	};
};
