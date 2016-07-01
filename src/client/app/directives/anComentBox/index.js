'use strict';
const moment = require("moment");

function anComentBox(Data, Utils) {
	return {
		template: require('./coment.box.jade')(),
		restrict: 'AE',
		scope: {
			'id': '=anComentBox',
			'offset': '=',
			'pregunta': '=',
			'enviar': '=',
			'documento': '=',
			'actualizar': '=',
			'ambitosSel': '=ambitos'
		},
		link: function (scope, element) {
			scope.$watch('offset', function (newValue, oldValue) {
				if (hasVal(newValue)) {
					element.css('top', newValue + 'px');
				}
			});
		},
		controller: function ($scope) {
			$scope.validAmbitos = function (ambitosSel) {
				for (let i in ambitosSel) {
					if (ambitosSel[i]) {
						return true;
					}
				}
				return false;
			};

			Data.get('ambito').then(function (result) {
				if (result.code !== 0) {
					return Data.toast(result);
				}
				$scope.ambitos = result.data;
			});
			$scope.$on('actualizarComentario', function () {
				traerComentarios($scope.id);
			});
			$scope.$watch('id', function (newValue, oldValue) {
				if (hasVal(newValue) && newValue !== '') {
					traerComentarios(newValue);
				} else {
					$scope.preguntas = [{
						pregunta: 'No hay preguntas/comentarios...'
					}];
				}
			});

			function traerComentarios(id) {
				$scope.pregunta = undefined;
				$scope.ambitosSel = [];
				Data.get('pregunta/file/' + $scope.documento + '/obj/' + id).then(function (result) {
					if (result.code !== 0) {
						return $scope.preguntas = [{
							pregunta: 'No hay preguntas/comentarios...'
						}];
					}
					for (let i in result.data) {
						result.data[i].fecha_crea = moment(result.data[i].fecha_crea).format('DD/MM/YYYY');
					}
					$scope.preguntas = result.data;

				});
			}
			//$scope.enviar = function () {
			//		var ruta =	$scope.documento.idO !== ''? 'preguntaAdicionalIn' : 'preguntaPrimeraIn';
			//		var data = {
			//				clave : 'P-' + Date.now(),
			//				tipo : $scope.documento.tipo,
			//				idEvento : $scope.documento.id_evento,
			//				idDoc : $scope.documento.id,
			//				pregunta : $scope.comentario
			//
			//		};
			//		console.log(ruta,data);
			//		//Data.post('preguntaPrimeraIn')
			//		//		.then(function (result) {
			//		//
			//		//		});
			//};
		}
	};
}

module.exports = anComentBox;