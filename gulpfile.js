var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('jshint', function() {
  return gulp.src('./msg.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
