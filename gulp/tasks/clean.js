const del = require('del');

// Полностью удаляем папку dist

module.exports = function clean(cb) {
  return del(['dist', 'roofing']).then(() => {
    cb()
  })
};
