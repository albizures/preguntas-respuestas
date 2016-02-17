const express = require('express'),
      app = express(),
      { BUILD_PATH,PORT } = require("./config");

require("./config/express.js")(app);
require("./router.js")(app);

const port = process.env.PORT || PORT;
const server = app.listen(port, function () {
  console.log('Run http://%s:%s', server.address().address, port);
});

module.exports = app;
