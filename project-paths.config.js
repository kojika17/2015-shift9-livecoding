/**
 * project-path.config.js
 */

// constants
var SRC     = './src';
var DEST    = './dest';
var ASSETS  = '/assets';
// export
module.exports = {
  src : {
    dir        : SRC,
    htmlFiles  : SRC + '/**/*.jade',
    cssDir     : SRC + ASSETS + '/scss',
    cssFiles   : SRC + ASSETS + '/scss/**/*.scss',
    imageDir   : SRC + ASSETS + '/image',
    imageFiles : SRC + ASSETS + '/image/**/*',
    fontDir        : SRC + ASSETS + '/fonts',
    fontFiles      : SRC + ASSETS + '/fonts/*.svg'
  },
  dest: {
    dir       : DEST,
    htmlFiles : DEST + '/**/*.html',
    cssDir    : DEST + ASSETS + '/css',
    cssFiles  : DEST + ASSETS + '/css/**/*.css',
    imageDir  : DEST + ASSETS + '/image',
    imageFiles: DEST + ASSETS + '/image/**/*',
    fontDir:   DEST + ASSETS + '/fonts',
    fontFiles: DEST + ASSETS + '/fonts/**/*'
  }
};