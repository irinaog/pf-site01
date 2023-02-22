//основной модуль
import gulp from 'gulp';
//импорт путей
import { path } from './gulp/config/path.js';
//импорт общих плагинов
import {plugins} from './gulp/config/plugins.js'


//Передаём значения в глобальную перменную
global.app = {
    isBuild: process.argv.includes('--builds'),
    isDev:!process.argv.includes('--build'),
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
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export {svgSprive}

//Последовательность обработки шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//построение сценарией выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);

export { dev };
export { build };
export { deployZip };
export { deployFtp };

//выполнение задачи по умлолчанию
gulp.task('default', dev)


