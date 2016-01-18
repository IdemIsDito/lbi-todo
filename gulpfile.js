var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    minifyHtml = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

var config = {
    paths : {
      public: 'public/**',
      index: 'app/index.html',
      styles: 'app/styles/*.+(less|css)',
      scripts: 'app/js/*.js',
      staticFiles: [
        '!app/**/*.+(less|css|js|html)',
        'app/**/*.*'
      ]
    },
    production: !!util.env.production
  };
gulp.task('clean', function(){
  return gulp.src(config.paths.public, {read: false})
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
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('static-files',function(){
  return gulp.src(config.paths.staticFiles)
    .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function () {
  return gulp.src(config.paths.styles)
    .pipe(config.production ? util.noop() : sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(autoprefixer({
			browsers: ['not ie <= 9']
		}))
    .pipe(config.production ? cssnano() : util.noop())
    .pipe(concat('lbi-todo.css'))
    .pipe(config.production ? util.noop() : sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src(config.paths.scripts)
    .pipe(config.production ? uglify() : util.noop())
    .pipe(concat('lbi-todo.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['static-files', 'styles', 'scripts', 'inject']);

gulp.task('watch', ['build'], function() {
  browserSync.init({
      server: "./public/"
  });
  if(!config.production) {
    gulp.watch(config.paths.styles, ['styles']);
    gulp.watch(config.paths.scripts, ['scripts']);
    gulp.watch(config.paths.index, ['inject']);
  }
});

gulp.task('default', ['watch']);
