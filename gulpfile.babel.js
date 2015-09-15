import gulp   from 'gulp';
import config from './config';

import browserify from 'browserify';
import babelify   from 'babelify';
import watchify   from 'watchify';

import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

import connect    from 'gulp-connect';
import exit       from 'gulp-exit';
import jade       from 'gulp-jade';
import gulfif     from 'gulp-if'
import less       from 'gulp-less';
import livereload from 'gulp-livereload';
import myth       from 'gulp-myth'
import rename     from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify     from 'gulp-uglify';
import gutil      from 'gulp-util';

// add custom browserify options here
var customOpts = {
  entries: ['./src/scripts/app.js'],
  debug: true,
  transform: [babelify]
};
var b = watchify(browserify(Object.assign({}, watchify.args, customOpts)));

gulp.task('js', scripts); // so you can run `gulp js` to build the file
b.on('update', scripts); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('less', () => {
  gulp.src('./src/styles/main.less')
    .pipe(less()) // собираем less
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(gulp.dest('./dist')) // записываем css
    .pipe(connect.reload()); // даем команду на перезагрузку css
});

gulp.task('jade', () => {
  var params = {
    data: config
  };
  if (gutil.env.type === 'production') {
    Object.assign(params, {
      pretty: true
    });
  }
  gulp.src(['./src/templates/*.jade', '!./src/templates/_*.jade']) // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
    .pipe(jade(params))
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./dist/')) // Записываем собранные файлы
    .pipe(gutil.env.type === 'production' ? exit() : gutil.noop())
    .pipe(connect.reload())
});

gulp.task('webserver', function() {
  connect.server({
    root: 'dist'
  });
});

// Запуск сервера разработки gulp watch
gulp.task('watch', ['js', 'less', 'jade'], function() {

  livereload.listen();

  gulp.watch('src/styles/**/*.less', ['less']);
  gulp.watch('src/templates/**/*.jade', ['jade']);


  // gulp.run('http-server');
});

gulp.task('default', ['watch', 'webserver'])

function scripts() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./src/scripts/app.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({
      loadMaps: true
    })) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(rename({
      dirname: ''
    }))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
    .pipe(gutil.env.type === 'production' ? exit() : gutil.noop());
}
