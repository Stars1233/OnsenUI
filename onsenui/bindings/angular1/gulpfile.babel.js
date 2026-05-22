import gulp from 'gulp';
import path from 'path';
import {argv} from 'yargs';
import { rollup } from 'rollup';
import rawBundleConfig from './rollup.config.js';

////////////////////////////////////////

const $ = require('gulp-load-plugins')();

////////////////////////////////////////
// webdriver-update (overrides parent definition)
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// e2e-test (overrides parent definition)
////////////////////////////////////////
function e2eTest(done) {
  const port = 8081;

  $.connect.server({
    root: path.resolve(__dirname, '../..'),
    port: port
  });

  const conf = {
    configFile: './test/e2e/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port
    ]
  };

  const specs = argv.specs ? argv.specs.split(',').map(s => s.trim()) : ['test/e2e/**/*js'];

  gulp.src(specs)
    .pipe($.protractor.protractor(conf))
    .on('error', function(e) {
      console.error(e);
      $.connect.serverClose();
      done(e);
    })
    .on('end', function() {
      $.connect.serverClose();
      done();
    });
}
gulp.task('e2e-test', e2eTest);

function clean() {
  return gulp.src(['dist'], { read: false, allowEmpty: true })
    .pipe($.clean());
}

function angularjsBindings() {
  const config = rawBundleConfig.reduce((r, c) => (r[c.output.name] = c) && r, {});

  return rollup(config.angularOns).then(bundle => bundle.write(config.angularOns.output));
}

gulp.task('build', gulp.series(clean, angularjsBindings));
