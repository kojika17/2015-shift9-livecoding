/**
 * gulp-tasks.config.js
 */

// jade
exports.jade = {
  pretty: true,
  data: require('./jade.json')
};

// autoprefixer
exports.autoprefixer = {
  browsers: ['last 2 versions']
};

// iconfont
exports.iconfont = {
  fontName: 'glyphicon-maboroshi',
  appendUnicode: true
};