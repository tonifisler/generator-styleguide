'use strict';

/**
 * Import plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    del = require('del');

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  /**
   * CSS VENDORS
   */
  gulp.src([
        ''
      ])
      .pipe($.concat('vendors.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('build/css'));

  /**
   * JS VENDORS
   * (with jQuery and Bootstrap dependencies first)
   */

  gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js'
    ])
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));


  /**
   * FONTS SOURCES
   * Important to add the bootstrap fonts to avoid issues with the fonts include path
   */
  gulp.src([
      'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*',
      'assets/fonts/*'
    ])
    .pipe(gulp.dest('build/fonts'));
});

/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  return gulp.src('assets/sass/<%=appname%>.scss')
    .pipe($.sass())
      .on('error', $.util.beep)
      .on('error', $.notify.onError(function (error) {
        return 'Message to the notifier: ' + error.message;
      }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('build/css'));
});

/**
 * Build JS
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('scripts', function() {
  return gulp.src('assets/js/*.js')
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});

/**
 * Lint JS
 */

 gulp.task('jshint', function () {
   return gulp.src('assets/js/*js')
     .pipe($.jshint())
     .pipe($.jshint.reporter('jshint-stylish'))
     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
 });

/**
 * Build Hologram Styleguide
 */
gulp.task('styleguide', function () {
  return gulp.src('hologram_config.yml')
    .pipe($.hologram());
});

/**
 * Clean output directories
 */
gulp.task('clean', del.bind(null, ['build', 'styleguide']));

/**
 * Serve
 */
gulp.task('serve', ['styles'], function () {
  browserSync({
    server: {
      baseDir: ['styleguide'],
    },
    open: false
  });
  gulp.watch(['**/*.html'], reload);
  gulp.watch(['assets/sass/**/*.scss'], function() {
    runSequence('styles', 'styleguide', reload);
  });
});

/**
 * Deploy to GH pages
 */

gulp.task('deploy', function () {
  gulp.src("styleguide/**/*")
    .pipe($.ghPages());
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'styles', 'jshint', 'scripts', 'styleguide', cb);
});

