'use strict';

module.exports = function ($scope, Data, $rootScope, NgTableParams, Utils, $state) {
	$rootScope.mostrarImg = true;
	Data.get('evento/auth/usuario')
		.then(function (result) {
			if (result.code !== 0) {
				Data.toast(result);
				return;
			}
			$scope.licitaciones = result.data;
			$scope.tableLicitaciones = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.licitaciones.length,
				filterDelay: 350,
				getData: function ($defer, params) {
					Utils.filtro($scope.licitaciones, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.selLicitacion = function (licitacion) {
		$scope.licitacionSel = licitacion;
		$rootScope.ImgEvento = $scope.licitacionSel.pos_imagen;
		$rootScope.$applyAsync();
		actualizarDocumentos(true);

	};

	function actualizarDocumentos() {
		Data.get('evento/' + $scope.licitacionSel.id_proyecto_licitacion + '/file/html')
			.then(function (result) {
				console.log(result);
				if (result.code !== 0) {
					Data.toast(result);
					$scope.documentos = [];
					$scope.tableDocumentos.reload();
					return;
				}
				$scope.documentos = result.data;
				if (hasVal($scope.tableDocumentos)) {
					return $scope.tableDocumentos.reload();
				}
				$scope.tableDocumentos = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
					total: $scope.documentos.length,
					filterDelay: 350,
					getData: function ($defer, params) {
						Utils.filtro($scope.documentos, $scope.filtro, params, $defer);
					}
				});
			});
	}
	$scope.ver = function (documento) {
		$state.go('visor', {
			id: documento.id,
			documento: documento
		});
	};
	$scope.descargar = function (url) {
		console.log(url.replace('mth', 'pdf').replace('html', 'pdf'));
		$scope.openVisor(url.replace('mht', 'pdf').replace('html', 'pdf'));
	};
};
