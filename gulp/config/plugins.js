//поиск и замена
import replace from 'gulp-replace';
//обработка ошибок
import plumber from 'gulp-plumber';
//Собщения (подсказки)
import notify from 'gulp-notify';
//Локальный сервер
import browsersync from 'browser-sync';
//Проверка обновлений
import newer from 'gulp-newer';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify, 
    browsersync: browsersync,
    newer:newer,
}