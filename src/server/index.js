const express = require('express'),
			app = express(),
			BUILD_PATH= require("./config/environment").BUILD_PATH,
			PORT = require("./config/environment").PORT;

require("./config/express.js")(app);
require("./router.js")(app);

const port = process.env.PORT || PORT;
const server = app.listen(port, 'localhost', function () {
	console.log('Run http://%s:%s', server.address().address, port);
});

module.exports = app;
