'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');
var rename =  require('gulp-rename');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var cssjoin = require('gulp-cssjoin');
var path = require('path');
var uglify = require('gulp-uglify');

gulp.task('browser-sync', function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: ['dist/css/*.css', 'dist/js/app.min.js', 'index.html', 'app/**/*.html'],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://gmae.renouveaux.lan',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 8080
  });
});

gulp.task('browserify', function() {
    gulp.src('app/app.js')
    .pipe(browserify({
        insertGlobals: true
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js',['browserify']);
    gulp.watch('assets/css/*.css', ['concat-css']);
    //gulp.watch('assets/js/*.js', ['concat-js']);
    gulp.watch('assets/less/**/*.less', ['less']);
    gulp.watch('assets/libs/**/*.css', ['less']);
});

gulp.task('concat-css', function () {
    gulp.src('assets/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('concat-js', function () {
    gulp.src('assets/js/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  gulp.src('dist/css/style.css')
  .pipe(sourcemaps.init())
  .pipe(minifyCSS())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
  gulp.src('dist/js/app.min.js')
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function () {
  gulp.src('assets/less/**/*.less')
    .pipe(cssjoin())
    .pipe(less())
    .pipe(concat('less.css'))
    .pipe(gulp.dest('assets/css'));
});


gulp.task('default', ['browser-sync', 'watch']);
