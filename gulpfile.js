var concat = require('gulp-concat');
var gulp = require('gulp');
var html2js = require('gulp-html2js');

gulp.task('html2js', function() {
  gulp.src('./client/templates/*').
    pipe(html2js({
      rename: function(name) {
        return name.replace(/^client\//, '');
      },
      outputModuleName: 'templates'
    })).
    pipe(concat('templates.js')).
    pipe(gulp.dest('./client/dist'));
});

gulp.task('concatjs', function() {
  gulp.src('./client/js/*').
    pipe(concat('all.js')).
    pipe(gulp.dest('./client/dist'));
});

gulp.task('compile', ['html2js', 'concatjs']);
