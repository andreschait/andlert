module.exports = function(grunt){
	"use strict";

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.initConfig({
		pkg:grunt.file.readJSON("package.json"),
		clean:{build:["lib"]},
		concat:{
			options:{
				stripBanners:true,
				banner: "/**\n" +
					 " * <%= pkg.name %>\n" +
					 " * <%= pkg.description %>\n" +
					 " *\n" +
					 " * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
					 " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
					 " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
					 " * @link <%= pkg.homepage %>\n" +
					 " * @module <%= pkg.name %>\n" +
					 " * @version <%= pkg.version %>\n" +
					 " */\n"
			},
			dist:{src:["src/andlert.js"],dest:"lib/andlert.js"}
		},
		connect:{
			server:{
				options:{
					port:9001,
					keepalive:true,
					base:'',
					hostname:'*'
				}
			}
		},
		copy:{
			main:{
				files:[{
					expand:true,
					cwd:"src/",
					src:["andlert.js"],
					dest:"lib/"
				}]
			}
		},
		jshint:{
			files:{
				src:[
					"Gruntfile.js",
					"src/**/*.js",
					"test/**/*.js",
					"!test/qunit/**/*.js"
				]
			},
			options:{
				curly:false,
				eqeqeq:true,
				immed:true,
				latedef:true,
				noempty:true,
				newcap:true,
				noarg:true,
				sub:true,
				undef:true,
				boss:true,
				eqnull:true,
				node:true,
				smarttabs:true,
				es5:true,
				globals:{
					document:true,
					andlert:true
				}
			},
		},
		qunit:{
			all:["test/index.html"]
		},
		uglify: {
			options:{
				banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
						"<%= grunt.template.today('yyyy-mm-dd') %> */\n"
			},
			dist:{
				files:{
					"lib/andlert.min.js":["<banner>","lib/andlert.js"]
				}
			}
		},
		watch:{
			src:{
				files:["src/andlert.js"],
				tasks:[
					"clean:build",
					"concat",
					"uglify"
				]
			}
		}
	});

	grunt.registerTask("default",["jshint","qunit","clean:build","concat","uglify"]);
};