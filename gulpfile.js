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
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';

//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js)
}

const mainTasks = gulp.parallel(copy, html, scss, js);

//построение сценарией выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher,server));

//выполнение задачи по умлолчанию
gulp.task('default', dev)


