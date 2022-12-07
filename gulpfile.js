"use strict"
const gulp = require('gulp'),
concatCSS = require('gulp-concat-css'),
minifyCSS = require('gulp-minify-css'),
rename = require("gulp-rename"),
notify = require('gulp-notify'),
prefix = require('gulp-autoprefixer'),
livereload = require('gulp-livereload'),
webserver = require('gulp-webserver');


//liveserver
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

//html
gulp.task('html', function () {
    gulp.src('app/index.html')
})

//css
gulp.task('css', function () {
    //place code for your default task here
    return gulp.src('css/**/*.css')
        .pipe(concatCSS("bundle.css"))
        .pipe(prefix('last 15 version'))
        .pipe(minifyCSS(''))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('app/css'));
    // .pipe(notify('Done!'))
})

//watch
gulp.task('watch', function(){
    gulp.watch('css/**/*.css', gulp.series(['css']));
    gulp.watch('app/index.html', gulp.series(['html']));
});

gulp.task('default', gulp.parallel('webserver','watch'));