const gulp = require('gulp');

var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');

var filesToMove = [
    './assets/images/*.*'
];
//compile sass

gulp.task('sass', function () {
    return gulp.src(['assets/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
})

// watch & serve
gulp.task("serve", gulp.series(["sass"], function () {
    browserSync.init({
        server: ""
    });

    gulp.watch(["./assets/scss/*.scss"], gulp.series(["sass"]));
    gulp.watch(["*.html"]).on("change", browserSync.reload);
}));


// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./assets/css/style.css')
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.bundle.js', './assets/js/*.js'])
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('move', function () {
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest('dist'));
});

// default task
gulp.task("default", gulp.series(["serve"]));
