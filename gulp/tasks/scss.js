import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

 //сжатие CSS файла
import cleanCss from 'gulp-clean-css';
//Выбор WEBP изображений
import webpcss from 'gulp-webpcss';
//Добавление вендорных префиксов
import autoPrefixer from 'gulp-autoprefixer';
//Группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: 'Error: <%= error.message%>'
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle:'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss({
            webpClass: ".webp",
            noWebpClass:".no-webp"
        }))
        .pipe(autoPrefixer({
            grid: true,
            overrideBrowserList: ['last 3 versions'],
            cascade:true,
        }))
        // Раскомментировать если нужен не сжатый дубль для файла стилей
        .pipe(app.gulp.dest(app.path.build.scss))
        .pipe(cleanCss())
        .pipe(rename({
            extname:".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.scss))
        .pipe(app.plugins.browsersync.stream());
};