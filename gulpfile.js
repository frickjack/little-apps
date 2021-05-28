const gulp = require('gulp');
const clean = require('gulp-rimraf');
const merge = require('merge-stream');
const svg2png = require('gulp-svg2png');
const gulpHelper = require('@littleware/little-nodedev/gulpHelper.js');
const basePath = "src/@littleware/little-apps";

const config = { ... gulpHelper.defaultConfig };
// configure nunjucks pages to load modules via
// /modules/version instead of /modules
config.nunjucks.data.jsroot = config.staging.jsroot;
gulpHelper.defineTasks(gulp, config);


const icoFolderPath = "web/site/resources/img/appIcons";
const hugoFolder = "hugo-site/hugo-apps.frickjack.com/static-little-apps"
gulp.task('makeIcoFolder', function(cb) {
    gulHelper.makeFolder(icoFolderPath).then(() => {cb();});
});

gulp.task('makeIco', function() {
    const rezList = ['57', '72', '114', '144', '152', '167', '180'];
    return merge.apply(
        this, 
        rezList.map(
            rez => gulp.src(`${basePath}/site/resources/img/*.svg`)
                    .pipe(svg2png({width:rez, height:rez}))
                    .pipe(gulp.dest(`${icoFolderPath}/${rez}x${rez}`))
        )
    );
});

gulp.task('compile', gulp.series('little-compile', 'makeIco', function(done) {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
  done();
}));

gulp.task('default', gulp.series('compile', function(done) {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
  done();
}));

gulp.task('stage', gulp.series('little-stage', 'makeIco', function(done) {
  return gulp.src(`${icoFolderPath}/**/*.png`
    ).pipe(
      gulp.dest(`${icoFolderPath.replace(/^web\/site/, 'dist')}/`)
    );
}));

gulp.task('hugo-clean', gulp.series('little-clean', () => {
  console.log('Clean all files in web/, commonjs/, and site/ folders');
  return gulp.src(
      [hugoFolder],
      { read: false, allowEmpty: true }
   ).pipe(clean());
}));

gulp.task('hugo-stage', gulp.series('hugo-clean', 'stage', function(){
  return merge.apply(
    this,
    ['modules', 'resources'].map(
      folderName =>
        gulp.src([`./dist/${folderName}/**/*.*`]
        ).pipe(
          gulp.dest(`${hugoFolder}/${folderName}`)
        )
      )
  );
}));

// shortcut for javascript develpment
gulp.task('hugo-build', gulp.series('little-compilets-web', function(){
  return merge.apply(
    this,
    ['lib', 'maps'].map(
      folderName =>
        gulp.src([`./web/${folderName}/**/*.*`]
        ).pipe(
          gulp.dest(`${hugoFolder}${config.staging.jsroot}/${gulpHelper.package.name}/web/${folderName}`)
        )
      )
  );
}));
