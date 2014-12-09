'use strict';

var gulp = require('gulp');

gulp.task('theme', function () {
    return gulp.src(['../<%= styleguide_name %>/build/**/*'])
      .pipe(gulp.dest('drupal/sites/all/themes/<%= theme_name %>/build'));
});

gulp.task('watch', ['theme'], function() {
    gulp.watch('../<%= styleguide_name %>/build/**/*', ['theme']);
});

gulp.task('default', ['theme']);
