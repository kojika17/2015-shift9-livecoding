/**
 * gulpfile.js
 */

var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var mqpacker     = require('css-mqpacker');
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var consolidate  = require('gulp-consolidate');
var iconfont     = require('gulp-iconfont');
var jade         = require('gulp-jade');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var runSequence  = require('run-sequence');

// load configurations
var paths = require('./project-paths.config');
var tasks = require('./gulp-tasks.config');

/**
 * build:vender
 */
gulp.task('build:vender', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat('vender.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.dir + '/assets/js'));
});


/**
 * build:html
 */
gulp.task('build:html', function() {
  return gulp.src(paths.src.htmlFiles)
    .pipe(plumber())
    .pipe(jade(tasks.jade))
    .pipe(gulp.dest(paths.dest.dir));
});

/**
 * build:css
 */
gulp.task('build:css', function () {
  return gulp.src(paths.src.cssFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([
      mqpacker,
      autoprefixer(tasks.autoprefixer)
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest.cssDir));
});

/**
 * build:font
 * - svgからフォントを生成する
 */
gulp.task('build:font', function () {
  var fontName = tasks.iconfont.fontName;
  return gulp.src(paths.src.fontFiles)
    .pipe(iconfont(tasks.iconfont))
    .on('glyphs', function (glyphs) {
      var option = {
        glyphs   : glyphs,
        fontName : fontName,
        fontPath : '/assets/fonts/',
        className: 'glyphicon'
      };

      gulp.src(paths.src.dir + '/assets/fonts/_template/_icons.scss')
        .pipe(consolidate('lodash', option))
        .pipe(rename({
          basename: '_' + fontName
        }))
        .pipe(gulp.dest(paths.src.cssDir));

      gulp.src(paths.src.dir + '/assets/fonts/_template/_icons.html')
        .pipe(consolidate('lodash', option))
        .pipe(rename({
          basename: '_' + fontName + '_sample'
        }))
        .pipe(gulp.dest(paths.dest.dir));
    })
    .pipe(gulp.dest(paths.dest.fontDir));
});

/**
 * build
 */
gulp.task('build', function() {
  return runSequence(
    'build:vender',
    'build:html',
    'build:font',
    'build:css'
  );
});


/**
 * server:task
 */
 gulp.task('server:html', ['build:html'], browserSync.reload);
 gulp.task('server:css', ['build:css'], browserSync.reload);
/**
 * server
 */
gulp.task('server', ['build'], function () {

  browserSync.init({
    server: {
      baseDir: paths.dest.dir
    }
  });

  gulp.watch(paths.src.htmlFiles, ['build:html']);
  gulp.watch(paths.src.cssFiles, ['build:css']);

  gulp.watch([
      paths.dest.htmlFiles,
      paths.dest.cssFiles
    ])
    .on("change", browserSync.reload);
});

