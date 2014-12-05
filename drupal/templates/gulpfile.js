'use strict';

var gulp = require('gulp');

gulp.task('theme', function () {
  gulp.watch('../<%= styleguide_name %>/build/**/*', function() {
    return gulp.src(['../<%= styleguide_name %>/build/**/*'])
      .pipe(gulp.dest('drupal/sites/all/themes/<%= theme_name %>/build'));
  });
});

gulp.task('default', ['theme'], function(){});
