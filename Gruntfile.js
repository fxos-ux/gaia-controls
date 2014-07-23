module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),

     jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    concat: {
      dist: {
        src: ['app/js/**/*.js'],
        dest: 'app/js/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      combine: {
          src: ['src/styles/fonts.css','src/bower_components/normalize-css/normalize.css','src/styles/main.css'],
          dest: 'dist/styles/<%= pkg.name %>.min.css'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/app/js/<%= pkg.name %>.min.js'
      }
    },
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
          //keepalive: true,
          middleware: function(connect, options) {
           return [
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
               
              // Serve the project folder
              connect.static(String(options.base))
            ];
          }
        }
      }
    },
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>/index.html'
      }
    },
    regarde: {
      all: {
        // This'll just watch the index.html file, you could add **/*.js or **/*.css
        // to watch Javascript and CSS files too.
        files:['**/*.html','**/*.css'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
    }

    
  });

  
  
  // https://github.com/yeoman/grunt-usemin
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  // grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
  
  grunt.registerTask('server',['open','livereload-start','connect','regarde' ]);


};