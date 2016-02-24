'use strict';
module.exports = function ($scope, $rootScope, Auth) {
	$scope.login = function (user) {

		Auth.login(user);
	};
};
