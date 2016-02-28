'use strict';
const moment = require("moment");
module.exports = function ($rootScope, $location, Utils, $uibModal, $state, store, jwtHelper, Auth) {
	// $rootScope.$watch('usuario', function (currentUser) {
	// 	if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
	// 		Auth.currentUser();
	// 	}
	// });
	window.hasVal = function (val) {
		return typeof val !== 'undefined' && val !== null;
	};
	$rootScope.today = {
		day: moment().date(),
		month: moment().month(),
		year: moment().year()
	};

	$rootScope.dias = Utils.dias;
	$rootScope.meses = Utils.meses;
	$rootScope.anios = Utils.anios;
	$rootScope.$on('$stateChangeSuccess', function (event, next, current) {

	});
	$rootScope.$on('$stateChangeStart', function (event, next, current) {
		if (['contacto', 'login'].indexOf(next.name) == -1) {
			// if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
			// event.preventDefault();
			// $state.go('login');
			Auth.currentUser();
			// }
		}
	});
	$rootScope.$on('event:auth-loginRequired', function () {
		$state.go('login');
		return false;
	});
	$rootScope.confirm = function (msg, cb) {
		var modal;
		if (!hasVal(msg)) {
			return console.error('msg undefined');
		}
		modal = $uibModal.open({
			template: require('./confirm.modal.jade')(),
			controller: require('./confirm.modal.js'),
			backdrop: 'static',
			size: 'sm',
			resolve: {
				msg: function () {
					return msg;
				}
			}
		});
		modal.result.then(function (result) {
			if (cb) {
				cb(result);
			}
		});
	};
	moment.locale('es', {
		relativeTime: {
			future: "en %s",
			past: "hace %s",
			s: "segundos",
			m: "un minudo",
			mm: "%d minutos",
			h: "una hora",
			hh: "%d horas",
			d: "un dia",
			dd: "%d dias",
			M: "un mes",
			MM: "%d meses",
			y: "un año",
			yy: "%d años"
		}
	});
	$rootScope.timeFromNow = function (date) {
		return moment(date).fromNow();
	};
	$rootScope.irPregunta = function (documento, pregunta) {
		$location.url('/visor/' + documento + '#' + pregunta);
		//$state.go('visor',{id : documento, '#' : pregunta});
	};
	$rootScope.getUnixDate = function (date) {
		return moment(date).unix();
	};
	$rootScope.openVisor = function (name) {
		window.open(name);
		/* var modalVisor = $modal.open({
					templateUrl : 'modalVisor',
					controller : 'ModalVisorCtrl',
					windowClass : 'visor',
					size : 'lg',
					resolve: {
							url: function () {
									return name;
							}
					}
			});*/
	};
};
