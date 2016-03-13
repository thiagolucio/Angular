var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var server = require('gulp-server-livereload');

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
  return gulp.src(['app/js/*.js', 'app/**/*.js'])
  	//.pipe(uglify())
  	.pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
});

//uglify com processo de clean antes de recriar a pasta dist CSS
gulp.task('uglify', ['clean'], function() {
  return gulp.src('app/css/*.css')
  	//.pipe(uglify())
  	.pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'));
});
//uglify - dá pra colocar os dois itens acima, JS e css numa única linha mas aqui está declarado por tasks separadas pra entender melhor

//servidor localhost
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryListing: true,
	  port: 8081,
      open: true
    }));
});

//ordem dos processos completos requeridos
gulp.task('default', ['jshint','uglify','webserver']);
