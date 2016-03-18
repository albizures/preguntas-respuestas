'use strict';
window.$ = window.jQuery = require("jquery");
require('./index.styl');
const angular = require("angular"),
	moment = require("moment");
require('angular-file-upload');
require('ng-toast');
angular.module("app", [
		require('angular-bootstrap-npm'),
		require('angular-ui-router'),
		require('angular-animate'),
		require('angular-sanitize'),
		require('angular-jwt'),
		require('angular-storage'),
		require('angular-http-auth-interceptor'),
		require('ng-table').name,
		'angularFileUpload',
		'ngToast',
		require('./states'),
		require('./services'),
		require('./directives')
	]).config(function (jwtInterceptorProvider, $urlRouterProvider, $locationProvider, $httpProvider, ngToastProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
		ngToastProvider.configure({
			//verticalPosition: 'bottom',
			//horizontalPosition: 'center',
			animation: "slide",
			maxNumber: 3
		});
		jwtInterceptorProvider.tokenGetter = function (store) {
			return store.get('jwt');
		};
		$httpProvider.interceptors.push('jwtInterceptor');
	})
	.constant('tipoMenu', {
		1: false,
		2: 1
	})
	.run(require('./app.run.js'));

require('./navbar.js');
