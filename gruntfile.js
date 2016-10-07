module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
        },
        src: ['test/**/*.js']
      }
    },
		jshint: {
		  // define the files to lint
		  files: ['model/**/*.js', 'test/**/*.js', '*.js'],
		  // configure JSHint (documented at http://www.jshint.com/docs/)
		  options: {
		    // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
		  }
		},
		less: {
			build: {
				files: {
	      'assets/css/app.css': 'assets/css/app.less'
	    	}
	    }
    },
		cssmin: {
		  build:{
		    src: 'assets/css/app.css',
		    dest: 'assets/css/app.min.css'
		  }
		},
		uglify: {
    	options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['assets/js/app.js'], 
        dest: 'assets/js/app.min.js' // la destination finale
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['mochaTest:test', 'jshint', 'less:build', 'cssmin:build', 'uglify:build']);


};