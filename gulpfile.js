const { src, dest, parallel, series } = require('gulp');
const rm = require('gulp-rm');

const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

function cleanDist() {
    return src('dist/**/*', { read: false, allowEmpty: true })
        .pipe(rm());
}

function copy() {
    return src(['src/favicon.png'])
        .pipe(dest('dist'));
}

function minifiHtml() {
    return src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}
function minifyCss() {
    return src('src/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist'));
}
function minifyJs() {
    return src('src/**/*.js')
        .pipe(terser())
        .pipe(dest('dist'));
}


exports.build = series(
    cleanDist, 
    copy, 
    parallel(minifiHtml, minifyCss, minifyJs))