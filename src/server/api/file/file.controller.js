'use strict';
const modelEvento = require('../evento/evento.model.js'),
	files = require('../../components/utils/files.js');

module.exports.file = function (req, res) {
	console.log(req.file,req.files);
	res.json([]);
};


module.exports.evento = function (req, res) {
	let data,
		idDoc = req.body.idDoc,
		basePath = 'uploads/evento' + req.body.idEvento + '/document',
		fileName = req.body.nombre_doc + '.' + req.body.tipo.toLowerCase();
	if (idDoc) {
		files.rename(req.file.path, basePath + idDoc + '/' + fileName, onRename);
	} else {
		data = [
			req.body.idEvento,
			req.body.nombre_doc,
			req.user.id
		];
		modelEvento.postDocument(data, onPostDocument);
	}
	function onPostDocument(result) {
		if (result.code == 0) {
			idDoc = result.data;
			files.mkdir(basePath + idDoc, onCreateFolder);
		} else {
			res.json(result);
		}
	}
	function onCreateFolder(err) {
		if (!err) {
			files.rename(req.file.path, basePath + idDoc + '/' + fileName, onRename);
		} else {
			resError(res);
		}
	}
	function onRename(err) {
		if (!err) {
			data = [
				idDoc,
				basePath + idDoc + '/' + fileName,
				0,
				req.body.tipo
			];
			if (req.body.tipo === 'ZIP') {
				files.unzip(data[1], onUnzip);
			} else {
				modelEvento.postFile(data, onPostFile);
			}
		} else {
			resError(res);
		}
	}
	function onRenameHtml(err) {
		if (err) {
			resError(res);
		} else {
			data = [
				idDoc,
				basePath + idDoc + '/' + req.body.nombre_doc + '.html',
				0,
				req.body.tipo
			];
			modelEvento.postFile(data, onPostFile);
		}
	}
	function onUnzip(err) {
		if (err) {
			resError(res);
		} else {
			files.getListFiles(basePath + idDoc + '/', onGetFiles);
		}

		function onGetFiles(err, data) {
			if (err) {
				resError(res);
			} else {
				fileName = data.filter(function (item) {
					return item.indexOf('.html') != -1;
				})[0];
				if (fileName) {
					files.rename(basePath + idDoc + '/' + fileName, basePath + idDoc + '/' + req.body.nombre_doc + '.html', onRenameHtml);
				} else {
					resError(res);
				}
			}
		}
	}
	function onPostFile(result) {
		result.data = idDoc;
		res.json(result);
	}
};
function resError(res) {
	console.trace('res error');
	res.json({code : 1, description : 'A ocurrido un error, intentelo de nuevo'});
}
