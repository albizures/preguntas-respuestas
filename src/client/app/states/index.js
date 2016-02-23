'use strict';

module.exports = angular.module('app.states', []).name;


// injector
require('./login/index.js');
require('./login/login.js');
require('./main/index.js');
require('./organizaciones/index.js');
require('./organizaciones/organizaciones.controller.js');
require('./organizaciones/organizaciones.modal.js');
require('./roles/index.js');
require('./roles/roles.controller.js');
require('./roles/roles.modal.js');
require('./usuarios/changePass.modal.js');
require('./usuarios/index.js');
require('./usuarios/usuarios.controller.js');
require('./usuarios/usuarios.modal.js');
// endinjector
