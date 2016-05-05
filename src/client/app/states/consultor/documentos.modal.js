'use strict';

module.exports = function ($scope, $uibModalInstance, Data, Utils, FileUploader, licitacion, cargar, store) {
	var idDoc = '',
		zip = ['application/zip', 'application/x-zip', 'application/x-zip-compressed', 'application/octet-stream', 'multipart/x-zip'],
		tnombre = "";

	$scope.cargar = cargar;

	$scope.uploading = false;
	$scope.create = true;

	function traerDocumentos() {
		Data.get('evento/files/' + licitacion.id).then(function (result) {
			let tempDocuments = [], count = 0;
			if (result.code !== 0) {
				return $scope.documentos = [];
			}
			for (let i = 0; i < result.data.length; i++) {
				let item = result.data[i];
				if (tempDocuments[count]) {
					tempDocuments[count][item.extension] = item.ubicacion;
				} else {
					tempDocuments[count] = item;
					tempDocuments[count][item.extension] = item.ubicacion;
				}
				if (result.data[i + 1] && result.data[i + 1].id !== item.id) {
					count++;
				}
			}
			$scope.documentos = tempDocuments;

		});
	}
	traerDocumentos();
	$scope.uploader = new FileUploader({
		url: '/api/file/evento',
		headers: {
			Authorization: 'Bearer ' + store.get('jwt')
		},
		arrayKey: ''
	});
	$scope.validPdf = function () {
		var result = $scope.uploader.queue.filter(function (item) {
			return item.file.type == "application/pdf";
		});
		return result.length == 0;
	};
	$scope.validZip = function () {
		var result = $scope.uploader.queue.filter(function (item) {
			return item.file.name.indexOf('zip') !== -1;
		});
		return result.length == 0;
	};
	$scope.getPdf = function () {
		var result = $scope.uploader.queue.filter(function (item) {
			return item.file.type == "application/pdf";
		});
		if (result.length != 0) {
			return result[0];
		}
		return undefined;
	};
	$scope.getZip = function () {
		var result = $scope.uploader.queue.filter(function (item) {
			return item.file.name.indexOf('zip') !== -1;
		});
		if (result.length != 0) {
			return result[0];
		}
		return undefined;
	};
	$scope.uploader.onSuccessItem = function (fileItem, result) {
		console.info('onSuccessItem', result);
		if (result.code == 0) {
			if (idDoc) {
				Data.toast({code : 0, description : 'Se a ingresado correctamente' });
			}
			return idDoc = result.data;
		}
		$scope.uploader.cancelAll();
		$scope.uploader.clearQueue();
		Data.toast(result);

	};
	$scope.uploader.onCompleteAll = function () {
		$scope.uploader.clearQueue();

		$scope.uploading = false;
		$scope.create = true;
		traerDocumentos();
		$scope.nombre = idDoc = '';

	};
	$scope.validarPdf = function (documento) {
		if (cargar) {
			return true;
		}
		return documento.ubicacion.indexOf('pdf') != -1;
	};
	$scope.addHandlerProcess = function (fn) {
		$scope.procesarHtml = fn;
	};
	$scope.uploader.onBeforeUploadItem = function (item) {
		tnombre = $scope.nombre;// + ' - ' + (item.file.type == "application/pdf" ? 'PDF' : 'HTML');
		item.formData.push({
			tipo: item.file.type == "application/pdf" ? 'PDF' : 'ZIP',
			idEvento: licitacion.id,
			nombre_doc: tnombre, // + ' - ' + item.file.type == "application/pdf"? 'PDF' : 'ZIP'
			idDoc : idDoc
		});
		$scope.uploading = true;
		$scope.create = false;
		console.info('onBeforeUploadItem');
	};
	$scope.ok = function () {
		$uibModalInstance.close();
	};
};
