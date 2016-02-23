'use strict';
angular.module('app.states').controller('ModalRolesCtrl', function ($scope, $uibModalInstance, rol, Data, Utils) {
		if (rol.id === undefined) {
			$scope.rolNuevo = true;
		} else {
			$scope.rolNuevo = false;
		}
		$scope.rol = angular.copy(rol);

		$scope.opciones = [];
		$scope.opcionesRol = [];
		$scope.newOpcionesRol = [];
		Data.get('opcion')
			.then(function (results) {
				$scope.opciones = results.data;
			});
		if (!$scope.rolNuevo) {

			console.log($scope.rol.id);
			Data.get('opcion/rol/' + $scope.rol.id)
				.then(function (result) {
					$scope.opcionesRol = result.data;
					console.log($scope.opcionesRol);
				});
		}

		$scope.ok = function () {
			$scope.rol.opciones = [];
			if ($scope.rolNuevo) {
				// TODO: dejar de usar for-in
				for (let index in $scope.opcionesRol) {
					$scope.rol.opciones.push( $scope.opcionesRol[index].idopcion);
				}
			}
			$uibModalInstance.close($scope.rol);
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.$watchCollection('opciones', function (newValue, oldValue) {
			if (newValue && newValue != oldValue) {
				ocultarOpciones();
			}
		});
		$scope.$watchCollection('opcionesRol', function (newValue, oldValue) {
			if (newValue && newValue != oldValue) {
				ocultarOpciones();
			}
		});
		$scope.agregarOpcion = function (opcion) {
			if ($scope.rolNuevo) {
				$scope.opcionesRol.push({
					opcion: opcion.nombre,
					idopcion: opcion.id
				});
				//agregar a newOpcionesRol
			} else {
				Data.post('perIn', {
						opciones: [opcion],
						idrol: $scope.rol.id
					})
					.then(function (result) {
						if (result.status == 'success') {
							$scope.opcionesRol.push({
								opcion: opcion.nombre,
								idopcion: opcion.id
							});
						}
					});
			}
		};
		$scope.eliminarOpcion = function (id) {
			if ($scope.rolNuevo) {
				eliminarOpcion(id);
			} else {
				Data.delete('rol/opcion/' + id + '/' + $scope.rol.id)
					.then(function (result) {
						Data.toast(result);
						if (result.code == 0) {
							eliminarOpcion(id);
						}
					});
			}

		};

		function eliminarOpcion(id) {
			// TODO: dejar de usar for in
			for (let index in $scope.opcionesRol) {
				if ($scope.opcionesRol[index].idopcion == id) {
					$scope.opcionesRol.splice(index, 1);
				}
			}
		}

		function ocultarOpciones() {
			// TODO: dejar de usar for in
			for (let i1 in $scope.opciones) {
				$scope.opciones[i1].visible = true;
				for (let i2 in $scope.opcionesRol) {
					if ($scope.opciones[i1].id == $scope.opcionesRol[i2].idopcion) {
						$scope.opciones[i1].visible = false;
					}
				}
				/*for(i3 in $scope.newOpcionesRol){
									 if($scope.opciones[i1].id ==  $scope.newOpcionesRol[i3].idopcion){
											 $scope.opciones[i1].visible = false;
									 }
							 }*/
			}
			// TODO: dejar de usar for in
			for (let index in $scope.opciones) {
				if ($scope.opciones[index].visible) {
					$scope.permiso = $scope.opciones[index];
					break;
				}
			}
		}
	});
