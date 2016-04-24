'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    //uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),// Плагин, позволяющий импортировать файлы кострукцией "//= pathToFile"
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    opn = require('opn');


var path = {
    // Путь для файлов, прошедших сборку
    build: {
        html: 'build',
        partials: 'build/partials',
        templates: 'build/templates',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img'
    },
    // Откуда брать исходные файлы
    src: {
        html: 'src/*.html',
        partials: 'src/partials/**/*',
        templates: 'src/templates/**/*',
        js: 'src/js/**/*',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*'
    },
    // Назначаем пересборку при изменении указанных файлов
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        partials:  'src/partials/**/*.html',
        templates: 'src/templates/**/*',
    }
};
/////////////////////////////////////////////////////////////////////////////

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task('partials', function () {
    return gulp.src([path.src.partials])
          .pipe(rigger())
        .pipe(gulp.dest(path.build.partials));
});


gulp.task('templates', function () {
    return gulp.src([path.src.templates])
          .pipe(rigger())
        .pipe(gulp.dest(path.build.templates));
});

gulp.task('js', function () {
    gulp.src(path.src.js)
        //     .pipe(sourcemaps.init())
        // .pipe(uglify())
        //   .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(path.src.css)
        .pipe(rigger())
        //  .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        //  .pipe(cssmin())
        //  .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('img', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
});

gulp.task('server', function() {
    connect.server({
        host: 'localhost',
        port: 4000,
        livereload: false
    });
});

gulp.task('browser', function() {
    opn( 'http://localhost:4000/build' );
});

gulp.task('browser_rel', function() {
    opn( 'http://localhost:4000/build/reliability.html' );
});




/////////////////////////////////////////////////////////////////////////////
gulp.task('build', [
    'html',
    'js',
    'css',
    'partials',
    'img',
    'templates'
]);

gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.partials], function(event, cb) {
        gulp.start('partials');
    });
    watch([path.watch.templates], function(event, cb) {
        gulp.start('templates');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img');
    });
});

gulp.task('default', ['build', 'server', 'watch', 'browser']);
gulp.task('reliability', ['build', 'server', 'watch', 'browser_rel']);