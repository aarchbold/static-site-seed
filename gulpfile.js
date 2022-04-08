var gulp = require('gulp'),    
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver');

    config = {
        vendorsPath: './src/js/vendors',
        jsPath: './src/js/app',
        jsDest: './site/static/js',
        sassPath: './src/sass',
        cssPath: './src/css',
        cssDest: './site/static/css',
        htmlSrc: './src/html/site/*',
        htmlDest: './site'
    }

gulp.task('fileinclude', function() {
    return gulp.src([
            config.htmlSrc + '/**/*.html',
            config.htmlSrc + '*.html'
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(replace('[[busterDouglas]]', new Date().getTime()))
        .pipe(gulp.dest(config.htmlDest));
});

gulp.task('vendors', function() {
    return gulp.src(config.vendorsPath + '/*.js')
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('js', function() {
    return gulp.src(config.jsPath + '/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('compress', function () {
    return gulp.src(config.jsDest + '/app.js')
        //.pipe(uglify())
        .pipe(gulp.dest(config.jsDest));
});

gulp.task('sass', function() {
    return sass(config.sassPath + '/styles.scss', { 
    		style: 'expanded',
            loadPath: [
               './src/sass'
            ]
    	})
        .pipe(gulp.dest(config.cssPath));
});


gulp.task('autoprefixer', function () {
    return gulp.src(config.cssPath + '/styles.css')
        .pipe(autoprefixer({
            overrideBrowserslist: [ 'last 3 version', 'safari 7', 'ie 9', 'ie 8', 'ios 7' ],
            cascade: false
        }))
        .pipe(gulp.dest(config.cssDest));
});

// Rerun the tasks when a file changes
gulp.task('watch', function() {
    gulp.watch(config.htmlSrc + '/**/*.html', ['fileinclude']);
    gulp.watch(config.htmlSrc + '*.html', ['fileinclude']);
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
    gulp.watch(config.cssPath + '/*.css', ['autoprefixer']);
    gulp.watch(config.vendorsPath + '/*.js', ['vendors']);
    gulp.watch(config.jsPath + '/*.js', ['js']);
    gulp.watch(config.jsDest + '/app.js', ['compress']);
});

gulp.task('server', function() {
    gulp.src('site')
      .pipe(server({
        livereload: true,
        open: true,
        port: 3003
    }));
});

gulp.task('default', ['fileinclude', 'sass', 'autoprefixer', 'vendors', 'js']);