var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('concat-js', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js','node_modules/popper.js/dist/umd/popper.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js', "source/js/aos.min.js", "source/js/app.js"])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('static/js/'));
});

gulp.task("css-sourcemaps", function() {
  gulp
    .src("source/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("static/css"));
});

gulp.task("css", function() {
  gulp
    .src("source/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("static/css"));
});

gulp.task("watch", function() {
  gulp.watch("source/scss/**/*.scss", ["css-sourcemaps"]);
  gulp.watch("source/js/**/*.js", ["concat-js"]);
});

gulp.task("build", ["css", "concat-js"]);
