'use strict';
var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var reload         = browserSync.reload;
// var watchify       = require('watchify');
var browserify     = require('browserify');
var source         = require('vinyl-source-stream');
var buffer         = require('vinyl-buffer');
var gutil          = require('gulp-util');
var sourcemaps     = require('gulp-sourcemaps');
var gulpif         = require('gulp-if');
var changed        = require('gulp-changed');
var uglify         = require('gulp-uglify');
var sass           = require('gulp-sass');
var autoprefixer   = require('gulp-autoprefixer');
var imagemin       = require('gulp-imagemin');
var _              = require('underscore');
var ghPages        = require('gulp-gh-pages');


var ENV;
var customOpts = {
  entries: ['./app/scripts/main.js'],
  debug: true
};
// var opts = _.assign({}, watchify.args, customOpts);

var b = browserify(customOpts);
// var b = watchify(browserify(opts));

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe( gulpif(ENV === 'production', uglify().on('error', gutil.log)) )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/scripts'))
    .pipe( gulpif(ENV !== 'production', browserSync.reload({ stream: true })) );
}

// pre-bundle transforms
// e.g. b.transform(coffeeify); b.transform(reactify);

gulp.task('browserify', bundle);
b.on('update', bundle);
b.on('log', gutil.log);


/****************************************************/
// asset precompile tasks
/****************************************************/
gulp.task('sass', function(){
  gulp.src('./app/styles/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('./build/styles'))
    .pipe( gulpif(ENV !== 'production', browserSync.reload({ stream: true })) );
});

gulp.task('images', function(){
  gulp.src('./app/images/**')
    .pipe(changed('./build/images')) // Ignore unchanged files
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
    .pipe( gulpif(ENV !== 'production', browserSync.reload({ stream: true })) );
});

/****************************************************/
// Move files not involved in a precompile
/****************************************************/
gulp.task('move', function(){
  gulp.src('./app/*.{html,txt}')
    .pipe(gulp.dest('./build'));

  gulp.src('./node_modules/zurb-foundation-npm/css/foundation.min.css')
    .pipe(gulp.dest('./build/styles'));

});

/****************************************************/
// Dev tasks
/****************************************************/
gulp.task('dev', function(){
  // this is a hack, no?
  ENV = 'development';
});

gulp.task('production', function(){
  // this is a hack, no?
  ENV = 'production';
});

gulp.task('watch', function(){
  gulp.watch(['./app/styles/**/*.{scss,sass}'], ['sass', reload]);

  gulp.watch(['./app/*.{html,txt}'], ['move', reload]);

  gulp.watch(['./app/scripts/**/*.{js,hbs}'], ['browserify', reload]);
});

gulp.task('serve', function(){
  browserSync({
    server: { baseDir: 'build' }
  });
});

gulp.task('gh-pages', function(){
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

/****************************************************/
// Exported tasks
/****************************************************/
gulp.task('build', ['browserify', 'sass', 'images', 'move']);

gulp.task('default', ['dev', 'build', 'serve', 'watch']);

gulp.task('deploy', ['production', 'build', 'gh-pages']);
