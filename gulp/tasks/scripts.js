const gulp = require('gulp');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');


// Работа со скриптами

module.exports = function script() {
  return gulp.src('dev/static/js/*.js')
    .pipe(eslint.format())
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('dist/static/js/'));
};
