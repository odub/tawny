'use strict';

var buffer = require('buffer');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var map = require('map-stream');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var intercept = require('gulp-intercept');
var fs = require('fs');

gulp.task('less', function () {
  gulp.src('./src/styles/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('bookmarklet', function () {
  var header = new Buffer('javascript:');

  gulp.src('./src/bookmarklet/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(concat('bookmarklet.js'))
    .pipe(map(function(file, cb) {
      file.contents = buffer.Buffer.concat([header, file.contents]);
      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  gulp.src('./src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', ['styles', 'scripts'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./**/*.css', './js/**/*.js'], {read: false, cwd: './dist'});

  return target.pipe(inject(sources, {addRootSlash: false}))
        .pipe(gulp.dest('./dist'));
});

var bookmarklet;
gulp.task('deploy-bookmarklet', ['html'], function () {
    var debug = true;
    var bookmarklet = fs.readFileSync('./dist/bookmarklet.js', 'utf8').replace(/"/g, '\'');
    console.log('BOOKMARKLET:', bookmarklet);

    return gulp.src('./dist/index.html')
               .pipe(replace('###BOOKMARKLET###', bookmarklet))
               .pipe(gulp.dest('./dist'));
})

gulp.task('clean', function () {
  return del(['./dist/*']);
});

gulp.task('styles', ['less']);

gulp.task('scripts', ['bookmarklet', 'js']);

gulp.task('default', ['clean', 'deploy-bookmarklet']);


gulp.task('watch', ['default'], function() {
  gulp.watch('src/**/*.html', ['deploy-bookmarklet']);
  gulp.watch('src/**/*.less', ['deploy-bookmarklet']);
  gulp.watch('src/**/*.js', ['deploy-bookmarklet']);
});
