const gulp = require('gulp');
const merge = require('merge-stream');
const exec = require('child_process').exec;
const mkdirp = require('mkdirp');
const replace = require('gulp-replace');
const gulpHelper = require('@littleware/little-elements/gulpHelper');
const basePath = "src/@littleware/little-apps";

// TODO - automate version assignment
const moduleVersion='1.0.0';
gulpHelper.defineTasks(gulp, { basePath, data: { jsroot: `/modules/${moduleVersion}` } });


gulp.task('makeico', function (cb) {
    return new Promise( function(resolve, reject) {
        const path = "site/resources/img/appIcons"; 
        mkdirp( path, function(err) {
                if (err) {
                    console.log( err );
                    reject( err );
                } else {
                    resolve( path );
                }
        });
    }).then( (folderStr) => {
        const promiseList = [ '57', '72', '114', '144', '152', '167', '180'
            ].map( 
                (rez) => {
                    return {
                        svgPath: `${basePath}/site/resources/img/511.svg`,
                        pngPath: `${folderStr}/oo511.${rez}x${rez}.png`,
                        rez:rez
                    };
                }
            ).map(
                (info) => {
                    return new Promise( function(resolve,reject) {
                        const commandStr = `inkscape ${info.svgPath} --export-png ${info.pngPath} -w${info.rez} -h${info.rez}`;
                        console.log( "makeico running command: " + commandStr );
                        exec( commandStr, 
                            function (err, stdout, stderr) {
                                console.log(stdout);
                                console.log(stderr);
                                if ( err ) {
                                    reject( err );
                                } else {
                                    resolve( info.pngPath );
                                }
                            }
                        );
                    });
                }
            );
        return Promise.all( promiseList );
    }).then(
        (pngList) => {
            cb();
        }
    ).catch(
        (err) => {
            console.log( "PNG creation failed", err );
        }
    );
});


gulp.task('compile', gulp.series('little-compile', 'makeico', function(done) {
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



gulp.task('deploy', gulp.series('little-compileclean', function(cb) {
    const pwdPath = process.cwd();
    const imageName = "frickjack/s3cp:1.0.0";
    const commandStr = "yes | docker run --rm --name s3gulp -v littleware:/root/.littleware -v '" +
        pwdPath + ":/mnt/workspace' " + imageName + " -copy /mnt/workspace/build/ s3://apps.frickjack.com/";

    console.log('Running: ' + commandStr);

    return exec( commandStr, 
        function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if ( err ) {
                //reject( err );
            } else {
                cb();
            }
        }
    );
}));


/**
 * Prepare /dist folder for deployment
 */
gulp.task('stage', gulp.series('little-compileclean', function() {
    return merge(
        gulp.src('site/**/*.*').pipe(gulp.dest('dist/')),
        gulp.src('node_modules/@littleware/little-elements/lib/**/*.*'
            // hack for now - replace /modules/ path in styleHelper
            ).pipe(replace(`/modules/`, `/modules/${moduleVersion}/`)
            ).pipe(gulp.dest(`dist/modules/${moduleVersion}/@littleware/little-elements/lib/`)
            ),
        gulp.src('node_modules/@littleware/little-elements/maps/**/*.*').pipe(gulp.dest(`dist/modules/${moduleVersion}/@littleware/little-elements/maps/`)),
        gulp.src('lib/**/*.*').pipe(gulp.dest(`dist/modules/${moduleVersion}/@littleware/little-apps/lib/`)),
        gulp.src('node_modules/lit-html/lit-html.js').pipe(gulp.dest(`dist/modules/${moduleVersion}/lit-html/`)),
        gulp.src('node_modules/font-awesome/**/*.*').pipe(gulp.dest(`dist/modules/${moduleVersion}/font-awesome/`)),
        gulp.src('node_modules/jasmine-core/lib/jasmine-core/**/*.*').pipe(gulp.dest(`dist/modules/${moduleVersion}/jasmine-core/lib/jasmine-core/`))
    );
}));
