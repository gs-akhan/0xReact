var http = require('http');
var gulp = require ('gulp');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var lr = require('tiny-lr');
lrserver = lr();
var ecstatic = require ('ecstatic');

var lrport = 35729,port=8080;

var path = {
  templates: 'src/views/**/*.jade',
  scripts : 'src/scripts/**/*.coffee',
  }

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src('./src/views/**/*.jade')
    .pipe(jade({locals: YOUR_LOCALS}))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload(lrserver));
});

gulp.task('coffee', function() {
    gulp.src(path.scripts, { read: false })
        .pipe(browserify({transform: ['coffeeify'], extensions: ['.coffee','.js']}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload(lrserver));
});


gulp.task('serve', function() {
  http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(port);
  lrserver.listen(lrport);
});

gulp.task('watch', function () {
    gulp.watch(path.templates, ['templates']);
    gulp.watch(path.scripts,['coffee']);
});

gulp.task('default',['templates','coffee','serve','watch']);
