'use strict';
angular.module('app.services').factory('Auth', function ($rootScope, Data, Utils,store, $state, jwtHelper) {
	$rootScope.usuario = null;//$cookieStore.get('user') || null;
	//$cookieStore.remove('user');

	function informacionUsuario(data) {
		var temp = [];
		$rootScope.usuario = {
			nombre: data.name,
			nombres: data.nombres,
			apellidos: data.apellidos,
			idRol: Number(data.idrol),
			rol: data.rol,
			idOrganizacion: data.idorganizacion,
			organizacion: data.organizacion,
			email: data.email
		};
		for (let index in data.opciones) {
			data.opciones[index] = Utils.convertNumber(data.opciones[index]);
		}
		for (let index in data.opciones) {
			if (data.opciones[index].Titulo_padre === null) {
				anidacion(data.opciones[index]);
			}
		}

		function anidacion(opcion, padre) {
			var hijos;
			if (opcion.Titulo_padre === null && padre === undefined) {
				temp.push(opcion);
			}
			hijos = data.opciones.filter(function (item) {
				return item.Titulo_padre == opcion.titulo;
			});
			if (hijos.length !== 0) {
				for (let index2 in hijos) {
					anidacion(hijos[index2], opcion);
				}
			}
			if (padre) {
				if (!padre.submenu) {
					padre.submenu = [];
				}
				padre.submenu.push(opcion);
			}
		}
		/*var temp = data.opciones.filter(function (item) {
						 return item.idPadre === 0;
				 });
				 console.log(data.opciones);
				 for(index in temp){
						 var cont = 0;
						 while(cont < data.opciones.length ){
								 if(temp[index].id === data.opciones[cont].id){
										 data.opciones.splice(cont,1);
										 cont--;
								 }else{
										 if(temp[index].id === data.opciones[cont].idPadre){
												 if(!temp[index].submenu){
														 temp[index].submenu = [];
												 }
												 temp[index].submenu.push(data.opciones.splice(cont,1)[0]);
												 cont--;
										 }
								 }
								 cont++;
						 }
				 }

					*/
		$rootScope.opciones = temp;
	}
	return {
		login: function (user) {
			user.password = Utils.str_rot13(user.password);
			Data.post('session', {
				username: user.username,
				password: user.password
			}).then(function (results) {
				Data.toast(results);
				if (results.status === "success") {
					store.set('jwt', results.data);
					console.log(jwtHelper.decodeToken(results.data));
					$state.go('main');
					//informacionUsuario(results);
				}
			});
		},

		logout: function (callback) {
			var cb = callback || angular.noop;
			Data.get('logout')
				.then(function (results) {
					Data.toast(results);
					$rootScope.usuario = null;
					$rootScope.opciones = null;
					return cb();
				});
		},
		currentUser: function () {
			Data.get('session')
				.then(function (results) {
					informacionUsuario(results);
				});
		}
	};
});
