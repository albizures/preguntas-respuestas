
const jwt = require('express-jwt'),
	config  = require('../config');


module.exports = jwt({
  secret: config.secret
});
