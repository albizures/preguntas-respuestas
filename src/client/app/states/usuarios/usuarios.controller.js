'use strict';
const templateModal = require('./usuarios.modal.jade')();
angular.module('app.states').controller('UsuariosCtrl', function (ngToast, $scope, Data, $rootScope, NgTableParams, $uibModal, Utils) {
	$scope.filtro = false;
	$scope.$watch('filtro', function (newValue, oldValue) {
		if (newValue !== undefined && newValue !== oldValue) {
			if ($scope.tableUsuarios) {
				$scope.tableUsuarios.reload();
			}
		}
	});
	ngToast.create('a toast message...');
	Data.get('usuario')
		.then(function (results) {
			$scope.usuarios = results.data;
			$scope.tableUsuarios = new NgTableParams(Utils.tableParams('nombre', 'asc'), {
				total: $scope.usuarios.length,
				getData: function ($defer, params) {
					Utils.filtro($scope.usuarios, $scope.filtro, params, $defer);
				}
			});
		});
	$scope.limpiar = function () {
		$scope.tableUsuarios.sorting({});
		$scope.tableUsuarios.filter({});
		$scope.filtro = false;
	};
	$scope.cambiarPass = function (usuario) {
		$uibModal.open({
			templateUrl: require('./changePass.jade'),
			controller: 'PassCtrl',
			size: 'sm',
			resolve: {
				administrador: function () {
					return true;
				},
				usuario: function () {
					return usuario;
				}
			}
		});
	};
	$scope.editar = function (id) {
		var modalUsuarios = $uibModal.open({
			template: templateModal,
			controller: 'ModalUsuariosCtrl',
			resolve: {
				usuario: function () {
					return $scope.usuarios.filter(function (usuario) {
						return usuario.id == id;
					})[0];
				}
			}
		});
		modalUsuarios.result.then(function (usuario) {
			Data.put('/', usuario)
				.then(function (results) {
					if (results.code == 0) {
						for (index in $scope.usuarios) {
							if ($scope.usuarios[index].id == usuario.id) {
								$scope.usuarios[index] = usuario;
								$scope.tableUsuarios.reload();
							}
						}
					}
					Data.toast(results);
				});
		}, function () {});
	};
	$scope.agregar = function () {
		var modalOpciones = $uibModal.open({
			template: templateModal,
			controller: 'ModalUsuariosCtrl',
			resolve: {
				usuario: function () {
					return {};
				}
			}
		});
		modalOpciones.result.then(function (usuario) {
			console.log(usuario);
			Data.post('usuario', usuario)
				.then(function (results) {
					Data.toast(results);
					if (results.code === 0) {
						console.log(results.data.id, results.data.id, results.data);
						usuario.id = results.data.id;
						$scope.usuarios.push(usuario);
						$scope.tableUsuarios.reload();
					}
				});
		});
	};
	$scope.eliminar = function (id) {
		Data.delete('usuario/' + id)
			.then(function (results) {
				for (let index in $scope.usuarios) {
					if ($scope.usuarios[index].id == id) {
						$scope.usuarios.splice(index, 1);
						$scope.tableUsuarios.reload();
						Data.toast(results);
						break;
					}
				}

			});
	};
});
