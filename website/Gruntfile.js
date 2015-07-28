module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'assets/js/index.min.js': ['assets/js/jquery-1.11.2.min.js', 'assets/js/sidepanel.js', 'assets/js/firebase.js', 'assets/js/index_timetables.js'],
          'assets/js/about.min.js': ['assets/js/jquery-1.11.2.min.js', 'assets/js/sidepanel.js'],
          'assets/js/timetables.min.js': ['assets/js/jquery-1.11.2.min.js', 'assets/js/sidepanel.js', 'assets/js/firebase.js', 'assets/js/timetables.js'],
          'assets/js/tickets.min.js': ['assets/js/jquery-1.11.2.min.js', 'assets/js/sidepanel.js', 'assets/js/firebase.js', 'assets/js/picker.js', 'assets/js/picker.date.js', 'assets/js/legacy.js', 'assets/js/payments.min.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
