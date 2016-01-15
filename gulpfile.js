var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create();

var paths = {
    public: 'public/**',
    index: 'app/index.html',
    styles: 'app/styles/*.+(less|css)',
    scripts: 'app/js/*.js',
    staticFiles: [
      '!app/**/*.+(less|css|js|html)',
      'app/**/*.*'
    ]
  };

gulp.task('clean', function(){
  return gulp.src(paths.public, {read: false})
    .pipe(clean());
});

gulp.task('index', function () {
  return gulp.src('./app/index.html')
    .pipe(minifyHtml({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('inject', ['index'], function() {
  var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});
  return gulp.src('./public/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(minifyCss())
    .pipe(concat('lbi-todo.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('lbi-todo.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
      server: "./public/"
  });
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.index).on('change', browserSync.reload);
});
gulp.task('build', ['static-files', 'styles', 'scripts', 'inject']);
