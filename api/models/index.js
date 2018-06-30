module.exports = require('require-all')({
  dirname: __dirname,
  filter: function (fileName) {
    const parts = fileName.split('.js');
    if (parts[0] === 'index') return;
    else return parts[0];
  }
});