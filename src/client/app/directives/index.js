'use strict';
module.exports = angular.module('app.directives', []).name;
// injector
angular.module('app.directives').directive(require('./anBack/index.js').name, require('./anBack/index.js'));
angular.module('app.directives').directive(require('./anComentBox/index.js').name, require('./anComentBox/index.js'));
angular.module('app.directives').directive(require('./anPreview/index.js').name, require('./anPreview/index.js'));
angular.module('app.directives').directive(require('./anVisor/index.js').name, require('./anVisor/index.js'));
angular.module('app.directives').directive(require('./menu/index.js').name, require('./menu/index.js'));
angular.module('app.directives').directive(require('./menuItem/index.js').name, require('./menuItem/index.js'));
angular.module('app.directives').directive(require('./ngProcessHtml/index.js').name, require('./ngProcessHtml/index.js'));
// endinjector
