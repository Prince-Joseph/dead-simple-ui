var gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const purgecss = require("gulp-purgecss");
const uglify = require('gulp-uglify');
var sass = require('gulp-sass');

const browserSync = require("browser-sync").create();

function nunjucks_to_html() {
  return (
    gulp
      .src("src/pages/**/*.+(html|nunjucks|njk)")
      .pipe(
        nunjucksRender({
          path: ["src/templates"],
        })
      )
      .pipe(gulp.dest("build"))
  );
}

gulp.task("nunjucks", nunjucks_to_html);

function buildStyle() {
  return gulp
    .src("src/assets/css/**/*.css")
    .pipe(purgecss({ content: ["build/*.html", "build/assets/js/**/*.js"] }))
    .pipe(gulp.dest("build/assets/css"));
}
gulp.task("css", buildStyle);

function uglifyJs(){
    return gulp.src(['src/assets/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest("build/assets/js"));
};
gulp.task("js", uglifyJs);

gulp.task("watch", function () {
    
  browserSync.init({
    server: {
      baseDir: "build",
    },
  });
  
  gulp
    .watch(["./build/**/*.html", "./build/**/*.css", "./build/**/*.js"])
    .on("change", browserSync.reload);
  gulp.watch("./src/**/**/*.njk", gulp.series("nunjucks"));
  gulp.watch("./src/assets/css/**/*.css", gulp.series("css"));
  gulp.watch("./src/assets/js/**/*.js", gulp.series("js",));
});
