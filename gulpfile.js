var gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const purgecss = require("gulp-purgecss");
const uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require("sass"));
var rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

function nunjucks_to_html() {
  return (
    gulp
      .src("src/**/*.+(html|nunjucks|njk)")
      .pipe(
        nunjucksRender({
          path: ["src/components"],
        })
      )
      .pipe(gulp.dest("build"))
  );
}


function compileSass(){
  return gulp.src('./src/assets/sass/**/*.scss') 
  .pipe(sass().on('error', sass.logError)) 
  .pipe(gulp.dest('./src/assets/css/')); 
}


function buildStyle() {
  return gulp
  .src("src/assets/css/**/*.css")
  .pipe(purgecss({ content: ["build/*.html", "build/assets/js/**/*.js"] }))
  .pipe(rename(function (path) {
    path.basename += ".min";
    path.extname = ".css";
  }))
  .pipe(gulp.dest("build/assets/css"));
}

function uglifyJs(){
  return gulp.src(['src/assets/js/*.+(js|ts)'])
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += ".min";
    path.extname = ".js";
  }))
  .pipe(gulp.dest("build/assets/js"));
};
function browserSyncTasky(){
 return browserSync.init({server:{baseDir: "build", },});
}

function watchFiles() {
  browserSyncTasky();
  gulp.watch(["./build/**/*.html", "./build/**/*.css", "./build/**/*.js"]).on("change", browserSync.reload);
  gulp.watch("./src/**/**/*.njk", gulp.series("nunjucks"));
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/assets/css/**/*.css", gulp.series("css"));
  gulp.watch("./src/assets/js/**/*.js", gulp.series("js",));
}

gulp.task("nunjucks", nunjucks_to_html);
gulp.task("sass", compileSass);
gulp.task("css", buildStyle);
gulp.task("js", uglifyJs);
gulp.task("watch", watchFiles);
