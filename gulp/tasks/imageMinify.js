const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return gulp.src(
    ['dev/static/images/**/*.{gif,png,jpg,svg,webp}',
    '!dev/static/images/sprite/**/*']
  )
    .pipe(gulpif(argv.prod, buffer()))
    .pipe(gulpif(argv.prod, imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ])))
    .pipe(gulp.dest('dist/static/images/'))
};
