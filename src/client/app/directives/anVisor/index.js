'use strict';
module.exports = function anVisor(Data, FileUploader) {
	return {
		template: require('./visor.jade')(),
		restrict: 'AE',
		scope: {
			documento: '=',
			estado: '='
		},
		link: function (scope, element, attrs) {
			console.log(element);
			let child = element.children();
			scope.estado.cargando = true;
			scope.estado.comentando = false;
			scope.termino = function () {
				let pregunta = $('#' + scope.estado.preguntaSel);
				scope.estado.cargando = false;
				if (pregunta.length == 1) {
					window.scrollTo(0, pregunta.offset().top - 60);
					pregunta.addClass('active');
					scope.estado.comentando = true;
					scope.estado.id = scope.estado.preguntaSel;
					scope.estado.offset = pregunta.offset().top - element.offset().top;
					scope.estado.objeto = pregunta[0];
					scope.$applyAsync();
				}
				init();
			};

			function reset() {
				scope.estado.comentando = false;
				scope.estado.id = scope.estado.offset = scope.estado.objeto = scope.estado.tipo = undefined;
				scope.$applyAsync();
			}

			function init() {
				let ps = $(element).find('p');
				ps.off('click');
				ps.on('click', function (evt) {
					if ($(this).find('span').length == 0 && $(this).find('img').length == 0) {
						return;
					}
					scope.estado.comentando = true;
					$(element).find('p.active').removeClass('active');
					if (this == scope.estado.objeto) {
						console.log('cerrar');
						return reset();
					}
					$(this).addClass('active');

					scope.estado.id = this.id;
					scope.estado.tipo = $(this).find('img').length == 0 ? 'P' : 'IMG';
					scope.estado.objeto = this;

					scope.estado.offset = $(this).offset().top - element.offset().top;
					scope.$applyAsync();
				});
			}

			scope.$watch('estado.comentando', function (newValue, oldValue) {
				if (hasVal(newValue) && oldValue !== newValue) {
					if (!newValue) {
						$(element).find('p.active').removeClass('active');
					}
				}
			});
			scope.changeId = function (id) {
				scope.estado.id = scope.estado.objeto.id = id;
			};
			scope.getHtml = function () {
				$(element).find('p.active').removeClass('active');
				let html = $('#archivo').html();
				$(scope.estado.objeto).addClass('active');
				return html;
			};
		},
		controller: function ($scope) {
			$scope.estado.ambitos = [];
			$scope.uploader = new FileUploader({
				url: 'server/api/uploadFileUPD',
				headers: 'Content-Type: text/html; charset=UTF-8'
			});
			$scope.enviar = function () {
				let nuevo = $scope.estado.id == '',
					ruta = nuevo ? 'preguntaPrimeraIn' : 'pregunta',
					ambitos = angular.copy($scope.estado.ambitos);
				for (let a = 0; a < ambitos.length; a++) {
					if (!hasVal(ambitos[a]) || ambitos[a] === false) {
						console.log('quitar', a, ambitos[a]);
						ambitos.splice(a, 1);
						a--;
					}
				}
				let data = {
					clave: nuevo ? $scope.estado.tipo + '-' + Date.now() : $scope.estado.id,
					tipo: $scope.estado.tipo,
					idEvento: $scope.documento.id_evento,
					idDoc: $scope.documento.id,
					pregunta: $scope.estado.pregunta,
					ambitos: ambitos,
					parrafo: $scope.estado.objeto.textContent
				};
				Data.post(ruta, data).then(function (result) {
						Data.toast(result);
						if (result.code == 0) {
							if (nuevo) {
								console.log('unevo');
							} else {
								$scope.$broadcast('actualizarComentario');
							}

						}
					});
			};
			$scope.updFile = function () {
				let a = new File([$scope.getHtml()], 'name.html', {
					type: "text/html"
				}),
					file = new FileUploader.FileItem($scope.uploader, a);
				file.progress = 100;
				file.isUploaded = true;
				file.isSuccess = true;

				file.formData.push({
					'nombre_doc': $scope.documento.ubicacion
				});
				$scope.uploader.queue.push(file);
				$scope.uploader.queue[0].upload();
			};
		}

	};
};
