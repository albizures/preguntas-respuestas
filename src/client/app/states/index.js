'use strict';

module.exports = angular.module('app.states', []).name;

// injector
angular.module('app.states').config(require('./ambitos/index.js'));
angular.module('app.states').config(require('./consulta/index.js'));
angular.module('app.states').config(require('./consultor/index.js'));
angular.module('app.states').config(require('./licitaciones/index.js'));
angular.module('app.states').config(require('./login/index.js'));
angular.module('app.states').config(require('./main/index.js'));
angular.module('app.states').config(require('./opciones/index.js'));
angular.module('app.states').config(require('./organizaciones/index.js'));
angular.module('app.states').config(require('./precalificacion/index.js'));
angular.module('app.states').config(require('./roles/index.js'));
angular.module('app.states').config(require('./usuarios/index.js'));
// endinjector
