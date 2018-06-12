var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'static/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'static/scripts/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
/*
 * Define our tasks using plain functions
 */

function stylesWatch() {
 return gulp.src(paths.styles.src)
   .pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(rename({
    basename: 'main',
    suffix: '.min'
   }))
   .pipe(gulp.dest(paths.styles.dest));
 }

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleancss({level: {1: {specialComments: 0}}}))    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

gulp.task('default', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

function scripts() {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js','node_modules/popper.js/dist/umd/popper.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js', "src/scripts/aos.min.js", "src/scripts/app.js"])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('static/scripts/'));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, stylesWatch);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(gulp.parallel(styles, scripts));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
