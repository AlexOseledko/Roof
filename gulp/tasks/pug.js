const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const version = require('gulp-version-number');
const versionConfig = {
  'value': '%MDS%',
  'append': {
    'key': 'v',
    'to': ['css', 'js'],
  },
};

// Преобразуем Pug в HTML

module.exports = function pug2html() {
  return gulp.src('dev/pug/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(version(versionConfig))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'))
};
