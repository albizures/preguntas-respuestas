'use strict';

module.exports = function ngProcessHtml(Data, FileUploader, store) {
	return {
		template: require('./ngProcessHtml.jade'),
		scope: {
			'addHandlerProcess': '=ngProcessHtml'
		},
		link: function (scope, element) {
			scope.termino = function () {
				let elementos = element.get(0).querySelectorAll('p > span,img'),
					newFile, file;
				for (let i = 0; i < elementos.length; i++) {
					let obj = elementos[i];
					if (obj.parentElement.tagName == 'SPAN') {
						if (obj.tagName == 'SPAN') {
							obj.parentElement.id = obj.parentElement.id || 'P-' + Date.now().toString() + i.toString();
						} else if (obj.tagName == 'IMG') {
							obj.parentElement.id = obj.parentElement.id || 'IMG-' + Date.now().toString() + i.toString();
						}
					} else {
						if (obj.tagName == 'SPAN') {
							obj.parentElement.id = obj.parentElement.id || 'P-' + Date.now().toString() + i.toString();
						} else if (obj.tagName == 'IMG') {
							obj.parentElement.id = obj.parentElement.id || 'iMG-' + Date.now().toString() + i.toString();
						}
					}
				}
				debugger;
				newFile = new File([element.get(0).children[0].innerHTML], 'name.html', {
					type: "text/html"
				});
				file = new FileUploader.FileItem(scope.uploader, newFile);
				file.progress = 100;
				file.isUploaded = true;
				file.isSuccess = true;

				file.formData.push({
					'ubicacion': scope.documento.HTML,
					'idEvento': scope.documento.id_evento,
					'id': scope.documento.id
				});
				scope.uploader.queue.push(file);
				scope.uploader.queue[0].upload();
			};
		},
		controller: function ($scope) {
			$scope.uploader = new FileUploader({
				url: 'api/file/evento',
				method : 'PUT',
				Authorization: 'Bearer ' + store.get('jwt'),
				headers: 'Content-Type: text/html; charset=UTF-8'
			});
			$scope.procesar = function (documento) {
				console.log(documento);
				$scope.documento = documento;
				$scope.$applyAsync();
			};
			$scope.addHandlerProcess($scope.procesar);
		}
	};
};
