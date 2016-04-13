'use strict';

module.exports = function ($scope, $stateParams, Data, $rootScope, $location) {
	$scope.estado = {};
	$scope.estado.preguntaSel = $location.hash();
	$rootScope.mostrarImg = true;
	if ($stateParams.documento === null) {
		Data.get('evento/file/html/' + $stateParams.id).then(function (result) {
			console.log(result);
			if (result.code !== 0) {
				return Data.toast(result);
			}
			result.data = result.data.filter(function (item) {
				return  item.ubicacion.indexOf('.html') != -1;
			})[0];
			result.data.ubicacionTemp = result.data.ubicacion + '?' + Date.now();
			result.data.ubicacion = result.data.ubicacion; // + '?' + Date.now();
			$scope.documento = result.data;
		});
	} else {
		$scope.documento = $stateParams.documento;
	}
};
