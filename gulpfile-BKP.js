var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var uglify = require('gulp-uglify'); - nao há necessidade de rodar ele agora
var clean = require('gulp-clean');
var concat = require('gulp-concat');
connect = require('gulp-connect');

//limpeza da pasta js antes de recriar arquivos compactados
gulp.task('clean', function () {
	return gulp.src('dist/*.js')
		.pipe(clean());
});

//limpeza da pasta css antes de recriar arquivos compactados
gulp.task('clean', function () {
	return gulp.src('dist/*.css')
		.pipe(clean());
});

//verificacao dos arquivos js pelo jshint e nao passa pelo processo de clean
gulp.task('jshint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//uglify com processo de clean antes de recriar a pasta dist JS
gulp.task('uglify', ['clean'], function() {
  return gulp.src('app/js/*.js')
  .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
});

//uglify com processo de clean antes de recriar a pasta dist CSS
gulp.task('uglify', ['clean'], function() {
  return gulp.src('app/css/*.css')
  .pipe(concat('style-concat.css'))
    .pipe(gulp.dest('dist/css'));
});


//servidor localhost
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
	port: 8001
  });
});

gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
});

//ordem dos processos completos requeridos
gulp.task('default', ['jshint','uglify','connect', 'watch']);
