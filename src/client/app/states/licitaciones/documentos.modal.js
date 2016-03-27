'use strict';

module.exports = function ($scope, $uibModalInstance, Data, Utils, FileUploader, licitacion, cargar) {

	var zip = ['application/zip', 'application/x-zip', 'application/x-zip-compressed', 'application/octet-stream', 'multipart/x-zip'],
		tnombre = "";

	$scope.cargar = cargar;

	$scope.uploading = false;
	$scope.create = true;

	function traerDocumentos() {
		Data.get('evento/files/' + licitacion.id)
			.then(function (result) {
				if (result.code !== 0) {
					return $scope.documentos = [];
				}
				$scope.documentos = result.data;

			});
	}
	traerDocumentos();
	$scope.uploader = new FileUploader({
		url: 'server/api/uploadFileEvento'
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
	$scope.uploader.onCompleteAll = function () {
		$scope.uploader.queue[0].remove();
		$scope.uploader.queue[0].remove();

		$scope.uploading = false;
		$scope.create = true;
		traerDocumentos();

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
		tnombre = $scope.nombre + ' - ' + (item.file.type == "application/pdf" ? 'PDF' : 'HTML');
		item.formData.push({
			tipo: item.file.type == "application/pdf" ? 'PDF' : 'ZIP',
			idEvento: licitacion.id,
			nombre_doc: tnombre // + ' - ' + item.file.type == "application/pdf"? 'PDF' : 'ZIP'
		});
		$scope.uploading = true;
		$scope.create = false;
	};
	$scope.ok = function () {
		$uibModalInstance.close();
	};
};
