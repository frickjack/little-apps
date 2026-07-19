const gulp = require('gulp');
const clean = require('gulp-rimraf');
const gulpHelper = require('@littleware/little-nodedev/gulpHelper.js');
const basePath = "src/@littleware/little-apps";
const through2 = require('through2');
const sharp = require('sharp');
const path = require('path');
const { finished } = require('stream/promises'); // modern nodejs native streams - no merge2


const config = { ... gulpHelper.defaultConfig };
// configure nunjucks pages to load modules via
// /modules/version instead of /modules
config.nunjucks.data.jsroot = config.staging.jsroot;
config.tsConfig = {
    noImplicitAny: false,
    rootDirs: [
        ".",
        "src",
        "node_modules",
        "node_modules/@littleware"
    ]
};
gulpHelper.defineTasks(gulp, config);


const icoFolderPath = "web/site/resources/img/appIcons";
const hugoFolder = "hugo-site/hugo-apps.frickjack.com/static-little-apps"
gulp.task('makeIcoFolder', function(cb) {
    gulHelper.makeFolder(icoFolderPath).then(() => {cb();});
});

gulp.task('makeIco', function() {
    const rezList = ['57', '72', '114', '144', '152', '167', '180'];
    
    return Promise.all(
        rezList.map(rez => {
            const size = parseInt(rez, 10);
            
            return gulp.src(`${basePath}/site/resources/img/*.svg`)
                .pipe(through2.objectTransform(function(file, enc, cb) {
                    if (file.isNull()) {
                        return cb(null, file);
                    }
                    if (file.isStream()) {
                        return cb(new Error('Streaming not supported'));
                    }

                    // Process SVG to PNG using sharp
                    sharp(file.contents)
                        .resize(size, size)
                        .png()
                        .toBuffer()
                        .then(buffer => {
                            file.contents = buffer;
                            // Change the output filename extension to .png
                            const ext = path.extname(file.path);
                            file.path = file.path.replace(ext, '.png');
                            cb(null, file);
                        })
                        .catch(err => cb(err));
                }))
                .pipe(gulp.dest(`${icoFolderPath}/${rez}x${rez}`));
        }).map(pipe => finished(pipe))
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
  return Promise.all(
    ['modules', 'resources'].map(
      folderName =>
        gulp.src([`./dist/${folderName}/**/*.*`]
        ).pipe(
          gulp.dest(`${hugoFolder}/${folderName}`)
        )
      ).map(pipe => finished(pipe))
  );
}));

// shortcut for javascript develpment
gulp.task('hugo-build', gulp.series('little-compilets-web', function(){
  return Promise.all(
    ['lib', 'maps'].map(
      folderName =>
        gulp.src([`./web/${folderName}/**/*.*`]
        ).pipe(
          gulp.dest(`${hugoFolder}${config.staging.jsroot}/${gulpHelper.package.name}/web/${folderName}`)
        )
      ).map(pipe => finished(pipe))
  );
}));
