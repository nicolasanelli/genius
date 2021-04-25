const gulp = require('gulp');
const rm = require('gulp-rm');

const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

function cleanDist() {
    return gulp.src('dist/**/*', { read: false, allowEmpty: true })
        .pipe(rm());
}

function copy() {
    return gulp.src(['src/favicon.png', 'src/**/*.js'])
        .pipe(gulp.dest('dist'));
}

function minifiHtml() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
}
function minifyCss() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
}


exports.build = gulp.series(
    cleanDist, 
    copy, 
    gulp.parallel(minifiHtml, minifyCss))