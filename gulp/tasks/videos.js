const gulp = require('gulp');

module.exports = function videos() {
  return gulp.src('dev/static/videos/**/*.*')
    .pipe(gulp.dest('dist/static/videos'))
};
