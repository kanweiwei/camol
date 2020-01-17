const gulp = require("gulp");
const babel = require("gulp-babel");
const babelConfig = require("./babelConfig");
const path = require("path");
const rimraf = require("rimraf");
const ts = require("gulp-typescript");

const merge = require("merge2");

const tsConfig = require("../tsconfig.json");
var tsProject = ts.createProject("tsconfig.json", tsConfig);

const source = [
  "src/**/*.js",
  "src/**/*.ts",
  "src/**/*.tsx",
  "!node_modules/**/*.*",
  "!src/camol/node_modules/**/*.*"
];

function clean(cb) {
  rimraf(path.join(__dirname, "../dist"), () => cb());
}

function compileWithBabel() {
  return gulp
    .src(source)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest("dist"));
}

function defaultTask() {
  const tsResult = gulp.src(source).pipe(tsProject());
  return merge([
    tsResult.dts.pipe(gulp.dest("dist")),
    tsResult.js.pipe(gulp.dest("dist"))
  ]);
}

exports.default = gulp.series(clean, defaultTask);
