const path = require('path'),
	fs = require('graceful-fs'),
	unzip = require('unzip2');

fs.mkdirParent = function (newPath, cb) {
	fs.mkdir(newPath, function (err) {
		console.log('mkdir',newPath, err);
		if (err && err.errno === -4058) {
			return fs.mkdirParent(path.dirname(newPath), function (err) {
				console.log('err', path.dirname(newPath), err);
				fs.mkdirParent(newPath, cb);
			});
		}
		if (cb) {
			cb(err);
		}
	});
};
exports.rename = function (oldPath, newPath, cb) {
	oldPath = path.normalize(oldPath);
	newPath = path.normalize(newPath);
	console.log(oldPath, newPath);
	fs.rename(oldPath, newPath, cb);
};
exports.unzip = function (newPath, cb) {
	newPath = path.normalize(newPath);
	console.log('unzip',newPath);
	fs.createReadStream(newPath)
		.pipe(unzip.Extract({ path: path.dirname(newPath) }))
		.once('error', function (err) {
			console.log('error', err);
			exports.unzip(newPath, cb);
		}).on('close', function () {
			if (cb) {
				cb();
			}
		});
	function onEntry (entry) {
		var fileName = entry.path;
		var type = entry.type; // 'Directory' or 'File'
		var size = entry.size;
		console.log('fileName',fileName, type, cb);
		//if (fileName === "this IS the file I'm looking for") {
		console.log('path.dirname',path.dirname(newPath));
			entry.pipe(fs.createWriteStream(path.dirname(newPath)));
		//} else {
		//	entry.autodrain();
		//}
		if (cb) {
			cb();
		}
	}
};
exports.mkdir = function (newPath, cb) {
	newPath = path.normalize(newPath);
	fs.stat(newPath, function (err, stats) {
		console.log('stat', err, stats && stats.isDirectory());
		if (err) {
			return fs.mkdirParent(newPath, cb);
		}

		if (stats.isDirectory()) {
			return cb();
		}
		fs.mkdirParent(newPath, cb);
	});

};
exports.getListFiles = function (newPath, cb) {
	fs.readdir(newPath, cb);
};
