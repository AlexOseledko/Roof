const gulp = require('gulp');
const script = require('./gulp/tasks/scripts');
const fonts = require('./gulp/tasks/fonts');
const videos = require('./gulp/tasks/videos');
const vendors = require('./gulp/tasks/vendorsJS');
const imageMinify = require('./gulp/tasks/imageMinify');
const styles = require('./gulp/tasks/styles');
const copy = require('./gulp/tasks/copy');
const clean = require('./gulp/tasks/clean');
const pug2html = require('./gulp/tasks/pug');
const spriteSVG = require('./gulp/tasks/spriteSVG');
const serve = require('./gulp/tasks/serve');
const spritePNG = require('./gulp/tasks/spritePNG');

const dev = gulp.parallel(pug2html, script, vendors, styles, imageMinify, spriteSVG, spritePNG, fonts, videos);

exports.default = gulp.series(
  clean,
  dev,
  copy,
  serve
);