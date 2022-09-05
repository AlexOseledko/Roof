const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  'node_modules/lazysizes/lazysizes.min.js',
  'node_modules/lazysizes/plugins/parent-fit/ls.parent-fit.min.js',
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
