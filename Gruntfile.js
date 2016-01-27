module.exports = function(grunt){
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
    browserify: {
        js1:{
			src: 'src/main/resources/static/src/app1/js/app.js',
			dest: 'src/main/resources/static/dist/app1/js/<%= pkg.name %>.js'
        },
		js2:{
			src: 'src/main/resources/static/src/app2/js/app.js',
			dest: 'src/main/resources/static/dist/app2/js/<%= pkg.name %>.js'
        }, 
        main:{
			src: 'src/main/resources/static/src/main/js/main.js',
			dest: 'src/main/resources/static/dist/main/js/main.js'
        }, 
    },
	uglify: {
		my_target: {
			files: {
				'src/main/resources/static/dist/app1/js/<%= pkg.name %>.min.js': ['<%= browserify.js1.dest %>']
			}
		},
		my_target2: {
			files: {
				'src/main/resources/static/dist/app2/js/<%= pkg.name %>.min.js': ['<%= browserify.js2.dest %>']
			}
		},
		my_target3: {
			files: {
				'src/main/resources/static/dist/main/js/main.min.js': ['<%= browserify.main.dest %>']
			}
		}
	},
	less: {
		  less1: {
		    options: {
		      	paths: ["src/main/resources/static/src/app1/css"],
		      	plugins: [
				        new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]}),
				        //new (require('less-plugin-clean-css'))()
				],
				 modifyVars: {
        			imgPath: '"http://mycdn.com/path/to/images"',
       				 bgColor: 'red'
      			}
		    },
		    files: {
		      "src/main/resources/static/src/app1/css/style.css": "src/main/resources/static/src/app1/less/*.less"
		    }
		  },
		  less2: {
		    options: {
		      paths: ["src/main/resources/static/src/app2/css"],
		      plugins: [
				        new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]}),
				        //new (require('less-plugin-clean-css'))()
				      ],
		    },
		    files: {
		      "src/main/resources/static/src/app2/css/style.css": "src/main/resources/static/src/app2/less/*.less"
		    }
		  },
		  less3: {
		    options: {
		      paths: ["src/main/resources/static/src/main/css"],
		      plugins: [
				        new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]}),
				        //new (require('less-plugin-clean-css'))()
				      ],
		    },
		    files: {
		      "src/main/resources/static/src/main/css/style.css": "src/main/resources/static/src/main/less/*.less"
		    }
		  }
	},
	 //压缩CSS
	cssmin: {
		  common: {
		    files: [{
		      expand: true,
		      cwd: 'src/main/resources/static/src/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'src/main/resources/static/dist/css',
		      ext: '.min.css'
		    }]
		  },
		  cs1: {
			  files: [{
			      expand: true,
			      cwd: 'src/main/resources/static/src/app1/css',
			      src: ['*.css', '!*.min.css'],
			      dest: 'src/main/resources/static/dist/app1/css',
			      ext: '.min.css'
			    }]
		  },
		  cs2: {
			  files: [{
			      expand: true,
			      cwd: 'src/main/resources/static/src/app2/css',
			      src: ['*.css', '!*.min.css'],
			      dest: 'src/main/resources/static/dist/app2/css',
			      ext: '.min.css'
			    }]
		  },
		  cs3: {
			  files: [{
			      expand: true,
			      cwd: 'src/main/resources/static/src/main/css',
			      src: ['*.css', '!*.min.css'],
			      dest: 'src/main/resources/static/dist/main/css',
			      ext: '.min.css'
			    }]
		  }
	},
    copy:{
		all:{
			expand: true,
			cwd: 'src/main/resources/static/src',
			src: ['**/*.html','**/*css', '**/*.png'],
			dest: 'src/main/resources/static/dist'
        },
        bootstrap:{
        	expand: true,
			cwd: 'node_modules/bootstrap/dist',
			src: ['css/bootstrap.min.css', 'css/bootstrap.min.css.map','js/bootstrap.min.js'],
			dest: 'src/main/resources/static/dist'

        }
    },
    karma: {
 		unit: {
   			configFile: 'karma.conf.js',
    		autoWatch: true
  		}
	},
	watch: {
		options:{
			livereload:true
        },
		js1:{
			files:['src/main/resources/static/src/app1/js/*.js'],
			tasks:['browserify:js1','uglify:my_target']
		},
		js2:{
			files:['src/main/resources/static/src/app2/js/*.js'],
			tasks:['browserify:js2','uglify:my_target2']
		},
		css1: {
			files:['src/main/resources/static/src/app1/less/*.less'],
			tasks:['less:less1','cssmin:cs1']
		},
		css2: {
			files:['src/main/resources/static/src/app2/less/*.less'],
			tasks:['less:less2','cssmin:cs2']
		},
		css3: {
			files:['src/main/resources/static/src/main/less/*.less'],
			tasks:['less:less3','cssmin:cs3']
		},
		main:{
			files:['src/main/resources/static/src/main/js/*.js'],
			tasks:['browserify:main','uglify:my_target3']
		},
		html:{
			files:['**/*.html'],
			tasks:['copy:all']
		}
    }
    });
    

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-karma');
	
    grunt.registerTask('default',['browserify', 'less', 'copy']);
	grunt.registerTask('release',['browserify', 'uglify', 'less', 'cssmin', 'copy']);
}