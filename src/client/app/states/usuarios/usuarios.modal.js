'use strict';
module.exports = function ($scope, $uibModalInstance, usuario, Data, Utils) {
	$scope.roles = undefined;
	$scope.contrasena = usuario.nombre == undefined;
	console.log(usuario);
	$scope.usuario = angular.copy(usuario);
	Data.get('organizacion/')
		.then(function (result) {
			$scope.organizaciones = result.data;
			if (!$scope.usuario.idorganizacion) {
				$scope.usuario.idorganizacion = $scope.organizaciones[0].id;
			}
		});
	Data.get('rol/')
		.then(function (result) {
			$scope.roles = result.data;
			if (!$scope.usuario.idrol) {
				$scope.usuario.idrol = $scope.roles[0].id;
			}
		});
	Data.get('usuario/estado')
		.then(function (result) {
			console.log(result);
			$scope.estados = result.data;
			if (!$scope.usuario.estado) {
				$scope.usuario.estado = $scope.estados[0].id;
			}
		});
	$scope.ok = function () {
		if ($scope.usuario.nombreEstado == undefined) {
			$scope.usuario.nombreEstado = $scope.estados.filter(function (estado) {
				return estado.id == $scope.usuario.estado;
			})[0].nombre;
		}
		if ($scope.usuario.rol == undefined) {
			$scope.usuario.rol = $scope.roles.filter(function (rol) {
				return rol.id == $scope.usuario.idrol;
			})[0].nombre;
		}
		if ($scope.usuario.organizacion == undefined) {
			$scope.usuario.organizacion = $scope.organizaciones.filter(function (organizacion) {
				return organizacion.id == $scope.usuario.idorganizacion;
			})[0].nombre;
		}
		if ($scope.usuario.fecha == undefined) {
			$scope.usuario.fecha = Date.now();
		}
		console.log($scope.usuario);
		$uibModalInstance.close($scope.usuario);
	};
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
