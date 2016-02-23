'use strict';
angular.module('app.services').factory('Data', function ($http, ngToast, Utils) {
	var serviceBase = '/api/',
		types = {
			0 : 'success',
			1 : 'danger',
			2 : 'info',
			3 : 'warning'
		},
		obj = {};
	obj.toast = function (data) {
		ngToast.create({
			className: types[data.code],
			content: data.description
		});
	};
	obj.get = function (q) {
		return $http.get(serviceBase + q).then(function (results) {
			return results.data;
		});
	};
	obj.post = function (q, object) {
		return $http.post(serviceBase + q, object).then(function (results) {
			return results.data;
		});
	};
	obj.put = function (q, object) {
		return $http.put(serviceBase + q, object).then(function (results) {
			return results.data;
		});
	};
	obj.file = function (q, object, options) {
		return $http.delete(serviceBase + q, options).then(function (results) {
			return results.data;
		});
	};
	obj.delete = function (q) {
		return $http.delete(serviceBase + q).then(function (results) {
			return results.data;
		});
	};

	return obj;
});
