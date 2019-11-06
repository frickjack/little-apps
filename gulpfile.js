const gulp = require('gulp');
const merge = require('merge-stream');
const exec = require('child_process').exec;
const mkdirp = require('mkdirp');
const replace = require('gulp-replace');
const svg2png = require('gulp-svg2png');
const gulpHelper = require('@littleware/little-elements/gulpHelper');
const package = require('./package.json');
const basePath = "src/@littleware/little-apps";

// TODO - automate version assignment
gulpHelper.defineTasks(gulp, { basePath, data: { jsroot: `/modules/${package.version}` } });

// make the icon folder
const makeFolder = function (path) {
    return new Promise( function(resolve, reject) {
            mkdirp( path, function(err) {
                    if (err) {
                        console.log( err );
                        reject( err );
                    } else {
                        resolve( path );
                    }
            });
        });
};

const icoFolderPath = "web/site/resources/img/appIcons";
    
gulp.task('makeIcoFolder', function(cb) {
    makeFolder(icoFolderPath).then(() => {cb();});
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


/**
 * Prepare /dist folder for deployment
 */
gulp.task('stage', gulp.series('little-clean', 'compile', function() {
    return merge(
        gulp.src('web/site/**/*.*'
            ).pipe(gulp.dest('dist/')),
        gulp.src('node_modules/@littleware/little-elements/web/**/*.*'
            // hack for now - replace /modules/ path in styleHelper and basicShell
            ).pipe(replace(`/modules/`, `/modules/${package.version}/`)
            ).pipe(gulp.dest(`dist/modules/${package.version}/@littleware/little-elements/web/`)
            ),
        gulp.src('node_modules/@webcomponents/webcomponentsjs/**/*.*'
            ).pipe(
                gulp.dest(`dist/modules/${package.version}/@webcomponents/webcomponentsjs/`)
            ),
        //gulp.src('node_modules/@littleware/little-elements/maps/**/*.*').pipe(gulp.dest(`dist/modules/${package.version}/@littleware/little-elements/maps/`)),
        gulp.src('web/**/*.*').pipe(gulp.dest(`dist/modules/${package.version}/@littleware/little-apps/web/`)),
        gulp.src('node_modules/lit-html/**/*.*').pipe(gulp.dest(`dist/modules/${package.version}/lit-html/`)),
        gulp.src('node_modules/font-awesome/**/*.*').pipe(gulp.dest(`dist/modules/${package.version}/font-awesome/`)),
        gulp.src('node_modules/jasmine-core/lib/jasmine-core/**/*.*').pipe(gulp.dest(`dist/modules/${package.version}/jasmine-core/lib/jasmine-core/`))
    );
}));
