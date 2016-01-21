module.exports = function(grunt){
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
    browserify: {
        js1:{
			src: 'src/main/resources/static/app1/js/app.js',
			dest: 'src/main/resources/static/dist/app1/js/<%= pkg.name %>.js'
        },
		js2:{
			src: 'src/main/resources/static/app2/js/app.js',
			dest: 'src/main/resources/static/dist/app2/js/<%= pkg.name %>.js'
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
		}
	},
    copy:{
		all:{
			expand: true,
			cwd: 'src/main/resources/static',
			src: ['**/*.html','**/*css', '**/*.png'],
			dest: 'src/main/resources/static/dist'
        },
    },
	watch: {
		options:{
			livereload:true
        },
		js1:{
			files:['src/main/resources/static/app1/js/*.js'],
			tasks:['browserify:js1','uglify:my_target']
		},
		js2:{
			files:['src/main/resources/static/app2/js/*.js'],
			tasks:['browserify:js2','uglify:my_target2']
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
	
    grunt.registerTask('default',['browserify', 'copy']);
	grunt.registerTask('release',['browserify', 'uglify', 'copy']);
}