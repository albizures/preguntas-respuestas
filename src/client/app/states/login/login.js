'use strict';
angular.module('app.states').controller('LoginCtrl', function ($scope, $rootScope, Auth) {
	$scope.login = function (user) {

		Auth.login(user);
	};
});
