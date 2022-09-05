const del = require('del');

// Полностью удаляем папку dist

module.exports = function clean(cb) {
  return del(['dist', 'WALK-IN-SHOWER', 'T1', 'T2', 'T3', 'T4']).then(() => {
    cb()
  })
};
