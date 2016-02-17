'use strict';

module.exports = angular.module('app.states', []).name;


// injector
require('./login/index.js');
require('./login/login.js');
require('./main/index.js');
require('./usuarios/changePass.modal.js');
require('./usuarios/index.js');
require('./usuarios/usuarios.controller.js');
require('./usuarios/usuarios.modal.js');
// endinjector
