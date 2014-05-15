module.exports = function(grunt) {
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),

     jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    concat: {
      dist: {
        src: ['src/app/js/**/*.js'],
        dest: 'dist/app/js/<%= pkg.name %>.js'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  // https://github.com/yeoman/grunt-usemin
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  // grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};