//основной модуль
import gulp from 'gulp';
//импорт путей
import { path } from './gulp/config/path.js';
//импорт общих плагинов
import {plugins} from './gulp/config/plugins.js'


//Передаём значения в глобальную перменную
global.app = {
    path: path,
    gulp: gulp,
    plugins:plugins,
}

//Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';

//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html);

//построение сценарией выполнения задач
const dev = gulp.series(reset, mainTasks, watcher);

//выполнение задачи по умлолчанию
gulp.task('default', dev)


// "use strict"
// const gulp = require('gulp'),
//     concatCSS = require('gulp-concat-css'),
//      sass = require('gulp-sass')(require('sass')),
//     minifyCSS = require('gulp-minify-css'),
//     rename = require("gulp-rename"),
//     notify = require('gulp-notify'),
//     prefix = require('gulp-autoprefixer'),
//     webserver = require('gulp-webserver'),
//     uncss = require('gulp-uncss-task'),
//     livereload = require('gulp-livereload');
   



// //liveserver
// gulp.task('webserver', function() {
//   gulp.src('app')
//     .pipe(webserver({
//       livereload: true,
//       open: true
//     }));
// });

// //html
// gulp.task('html', function () {
//     gulp.src('app/index.html')
// })

// //css
// gulp.task('css', function () {
//     //place code for your default task here
//     return gulp.src('sass/style.scss')
//         .pipe(sass())
//         .pipe(prefix('last 15 version'))
//         .pipe(minifyCSS(''))
//         .pipe(rename('bundle.min.css'))
//         .pipe(gulp.dest('app/css'));
//     // .pipe(notify('Done!'))
// })

// //remove unused css
// // gulp.task('uncss', function() {
// //     gulp.src('app/css/bundle.min.css')
// //         .pipe(uncss({
// //             html: ['app/index.html']
// //         }))
// //         .pipe(gulp.dest('app/css'));
// // });

// //watch
// gulp.task('watch', function(){
//     gulp.watch('sass/style.scss', gulp.series(['css']));
//     gulp.watch('app/index.html', gulp.series(['html']));
// });

// gulp.task('default', gulp.parallel('webserver','watch'));