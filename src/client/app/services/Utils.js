'use strict';
const moment = require("moment");
angular.module('app.services').factory("Utils", function ($filter) {

	var dias = [],
		nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		meses = [],
		anios = [];
	for (let i = 1; i < 32; i++) {
		dias.push(i);
	}
	for (let b = 0; b < nombreMeses.length; b++) {
		meses.push({
			nombre: nombreMeses[b],
			id: Number(b)
		});
	}
	for (let a = 1950; a <= moment().year(); a++) {
		anios.push(a);
	}

	return {
		tableParams : function (key, value) {
			let params = {
				page: 1,
				count: 10,
				sorting: {}
			};
			params.sorting[key] = value;
			return params;
		},
		filtro : function (data, filtros, params, done) {
			var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
			if (filtros) {
				orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;
			}
			done.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		convertNumber: function (obj) {
			for (let index in obj) {
				if (obj[index] !== null && obj[index] !== undefined && !isNaN(Number(obj[index]))) {
					obj[index] = Number(obj[index]);
				}
			}
			return obj;
		},
		dias: dias,
		meses: meses,
		anios: anios,
		convertDate: function (dia, mes, anio) {
			return moment([2015, 10, 2]);
		},
		str_rot13: function (str) {
			return (str + '')
				.replace(/[a-z]/gi, function (s) {
					return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
				});
		}
	};

});
