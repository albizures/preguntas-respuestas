var optionsProd = {
	"watch" : [
		"xxx"
	],
	env: {
		NODE_ENV : 'development',
		PORT: 80
	},
	"ignore":[
		"node_modules/",
		"dist/",
		"src/server/",
		"src/client/",
		"uploads/"
	]
};

module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		watch: {
			options: {
				event: ['added', 'deleted'],
			},
			states: {
				files: ['src/client/app/states/**/index.js'],
				tasks: ['injector:states']
			},
			directives: {
				files: ['src/client/app/directives/**/**.js'],
				tasks: ['injector:directives']
			},
			services: {
				files: ['src/client/app/services/**.js'],
				tasks: ['injector:services']
			},
			stylus: {
				files: [
					'src/client/app/{states,directives}/**/*.styl',
					'src/client/app/style/*.styl'
				],
				tasks: ['injector:stylus']
			},
		},
		concurrent: {
			dev: {
				tasks: ['nodemon:server', 'nodemon:webpack', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			},
			prod : {
				tasks: ['nodemon:serverProd', 'nodemon:webpackProd'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		injector: {
			options : {
				relative : true
			},
			directives: {
				options: {
					starttag: '// injector',
					endtag: '// endinjector',
					transform: function(filePath) {
						return 'angular.module(\'app.directives\').directive(require(\'.' + filePath + '\').name, require(\'.' + filePath + '\'));'
							return 'require(\'.' + filePath + '\');';
					}
				},
				files: {
					'src/client/app/directives/index.js': [
						'src/client/app/directives/**/**.js',
						'!src/client/app/directives/index.js'
					]
				}
			},
			states: {
				options: {
					starttag: '// injector',
					endtag: '// endinjector',
					transform: function(filePath) {
							return 'angular.module(\'app.states\').config(require(\'.' + filePath + '\'));';
					},
				},
				files: {
					'src/client/app/states/index.js': [
						'src/client/app/states/**/index.js',
						'!src/client/app/states/index.js'
					]
				}
			},
			stylus: {
				options: {
					transform: function(filePath) {
							return '@import \'' + filePath + '\';';
					},
					starttag: '// injector',
					endtag: '// endinjector'
				},
				files: {
					'src/client/app/index.styl': [
						'src/client/app/{services,style}/**.styl',
						'src/client/app/{directives,states}/**/**.styl',
						'!src/client/app/index.styl'
					]
				}
			},
			services: {
				options: {
					starttag: '// injector',
					endtag: '// endinjector',
					transform: function(filePath) {
							return 'require(\'.' + filePath + '\');';
					}
				},
				files: {
					'src/client/app/services/index.js': [
						'src/client/app/services/**.js',
						'!src/client/app/services/index.js'
					]
				}
			}
		},
		nodemon: {
			webpackProd : {
				script: 'src/webpack.local.config.js',
				options : optionsProd
			},
			serverProd : {
				script: 'index.js',
				options : optionsProd
			},
			webpack : {
				script: 'src/webpack.local.config.js',
				options : {
					"verbose": true,
					"watch" : [
						"src/webpack.local.config.js"
					],
					"ignore":[
						"node_modules/",
						"dist/",
						"src/server/",
						"src/client/",
						"uploads/"
					]
				}
			},
			server: {
				script: 'index.js',
				options : {
					"verbose": true,
					"watch" : [
						"src/server/"
					],
					"ignore":[
						"node_modules/",
						"dist/",
						"src/client/",
						"uploads/"
					]
				}
			}
		},
	});
	grunt.event.on('watch', function (action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
	//grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', [
		'injector:directives',
		'injector:stylus',
		'injector:services',
		'concurrent'
	]);

	grunt.registerTask('prod', [
		'concurrent:prod'
	]);
}
