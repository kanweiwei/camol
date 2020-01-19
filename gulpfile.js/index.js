const gulp = require("gulp");
const babel = require("gulp-babel");
const babelConfig = require("./babelConfig");
const path = require("path");
const rimraf = require("rimraf");
const ts = require("gulp-typescript");
const fs = require("fs");
const merge = require("merge2");

function getPackages() {
  let packages = fs.readdirSync(path.join(__dirname, "../packages/"));
  if (packages && packages.length > 0) {
    return packages;
  } else {
    return [];
  }
}

const source = ["!node_modules/**/*.*"];
function clean(cb) {
  rimraf(path.join(__dirname, "../dist"), () => cb());
}

function compileWithBabel() {
  return gulp
    .src(source)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest("dist"));
}

function babelJs(stream, p) {
  return stream
    .pipe(gulp.dest(`dist/${p}/dist/`))
    .pipe(gulp.dest(`dist/${p}/es/`))
    .pipe(
      babel({
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      })
    )
    .pipe(gulp.dest(`dist/${p}/lib/`));
}
let packages = getPackages();
let packageCompileTasks = packages.map(p => {
  const compileTask = () => {
    let tsProject = ts.createProject("tsconfig.json");

    let s = [].concat(source, [
      `packages/${p}/src/**/*.ts`,
      `packages/${p}/src/**/*.tsx`,
      `!packages/${p}/node_modules/**/*.*`
    ]);
    const tsResult = gulp.src(s).pipe(tsProject());
    return merge([
      tsResult.dts
        .pipe(gulp.dest(`dist/${p}/dist/`))
        .pipe(gulp.dest(`dist/${p}/lib/`))
        .pipe(gulp.dest(`dist/${p}/es/`)),
      babelJs(tsResult.js, p)
    ]);
  };
  return compileTask;
});

function copyPackageJson() {
  let packages = getPackages();
  return merge(
    packages.map(p => {
      let source = [`packages/${p}/package.json`];
      return gulp.src(source).pipe(gulp.dest(`dist/${p}/`));
    })
  );
}

exports.copyPackageJson = gulp.series(copyPackageJson);

exports.default = gulp.series(clean, copyPackageJson, ...packageCompileTasks);
