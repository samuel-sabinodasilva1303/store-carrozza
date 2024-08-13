import gulp from 'gulp'
import autoprefixer from "gulp-autoprefixer";
import obfuscator from "gulp-javascript-obfuscator";
import stylus from "gulp-stylus";
import concat from "gulp-concat";
import image from "gulp-image";
import cleanCss from "gulp-clean-css";
import wrap from "gulp-wrap";
import gulpMode from "gulp-mode";
import log from "fancy-log";
import chalk from "chalk";
import prettyTime from "pretty-hrtime";
import shell from "gulp-shell";
import { fileURLToPath } from "node:url";
const __dirname = fileURLToPath(decodeURI(new URL('.', import.meta.url)));
const { watch, src, dest, series, parallel } = gulp
const mode = gulpMode();

const js = () => {
  return src("src/**/*.js", { sourcemaps: false })
    .pipe(concat("theme.min.js"))
    .pipe(wrap('(function($){\n"use strict";\n<%= contents %>\n})(jQuery);'))
    .pipe(mode.production(obfuscator()))
    .pipe(dest("opencode/js"));
};

const css = () => {
  return src("src/**/*.styl")
    .pipe(
      stylus({
        "include css": true,
        compress: true,
        linenos: false,
        import: __dirname + "src/default.styl",
      })
    )
    .pipe(autoprefixer())
    .pipe(concat("theme.min.css"))
    .pipe(cleanCss())
    .pipe(dest("opencode/css"));
};

const img = () => {
  return watch("src/img/*").on("add", function (path) {
    let start = process.hrtime();
    log.info("Starting", "'" + chalk.cyan("img") + "'...");
    src(path)
      .pipe(image())
      .pipe(dest("opencode/img"))
      .on("end", () => {
        let end = process.hrtime(start);
        let time = prettyTime(end);
        log.info(
          "Finished",
          "'" + chalk.cyan("img") + "' after " + chalk.magenta(time)
        );
      });
  });
};

const imgUploaded = () => {
  return watch("opencode/img/*").on("add", function (path, stats) {
    let start = process.hrtime();
    log.info("Starting", "'" + chalk.cyan("imgUploaded") + "'...");
    let file = path.replace("opencode/", "");
    src(path)
      .pipe(shell(["cd opencode && tray upload " + file]))
      .on("end", () => {
        let end = process.hrtime(start);
        let time = prettyTime(end);
        log.info(
          "Finished",
          "'" + chalk.cyan("imgUploaded") + "' after " + chalk.magenta(time)
        );
      });
  });
};

const imgDeleted = () => {
  return watch("opencode/img/*").on("unlink", function (path, stats) {
    let start = process.hrtime();
    log.info("Starting", "'" + chalk.cyan("imgDeleted") + "'...");
    let file = path.replace("opencode/", "");
    src("opencode/", { allowEmpty: true })
      .pipe(shell(["cd opencode && tray remove " + file]))
      .on("end", () => {
        let end = process.hrtime(start);
        let time = prettyTime(end);
        log.info(
          "Finished",
          "'" + chalk.cyan("imgDeleted") + "' after " + chalk.magenta(time)
        );
      });
  });
};

export const build = async () => {
  return parallel(js, css)();
};

export const dev = () => {
  watch("src/**/*.js", { usePolling: true }, series(js));
  watch("src/**/*.styl", { usePolling: true }, series(css));
  img();
  imgUploaded();
  imgDeleted();
};