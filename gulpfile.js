var gulp = require('gulp');
var rename = require('gulp-rename'); 
var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var replace = require('gulp-html-replace');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var lessAutoPrefix = require('less-plugin-autoprefix');
var cleanCssPlugin = require('less-plugin-clean-css');
var less = require('gulp-less');
var spritecreator = require('gulp.spritesmith');

gulp.task('mover', function() {
    gulp.src('dev/fonts/*.*').pipe(gulp.dest('build/fonts/'));
    gulp.src('dev/img/*.*').pipe(gulp.dest('build/img/'));
    gulp.src('dev/js/*.js').pipe(gulp.dest('build/js/'));

});
gulp.task('sprite', function() {
  var spriteData = gulp.src('dev/img/icons/*.png').pipe(spritecreator({
      imgName: '../img/sprite.png',
      cssName: 'sprite.css',
      algorithm: 'binary-tree'
  }));
  spriteData.img.pipe(gulp.dest('build/img/'));
  spriteData.css.pipe(gulp.dest('build/css/'));
});
gulp.task('getCSS', function () {
   gulp.src('dev/less/general.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});    
gulp.task('html', function () {
	gulp.src('dev/html/**/*.html')
    	.pipe(includer())
      .pipe(replace({
        css: 'css/general.css'
      }))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});
gulp.task('server', function() {
  connect.server({
    root: 'build',
    livereload: true  
  });
});
gulp.task('default', function() {
	gulp.start('getCSS', 'html', 'server', 'mover');

	gulp.watch(['dev/**/*.html'], function(event) {
		gulp.start('html');
	});
	gulp.watch(['dev/less/**/*.less'], function(event) {
		gulp.start('getCSS');
	});
});
