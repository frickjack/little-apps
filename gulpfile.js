const gulp = require('gulp');
const exec = require('child_process').exec;
const mkdirp = require( 'mkdirp' );
const gulpHelper = require('@littleware/little-elements/gulpHelper');
const basePath = "src/@littleware/little-apps";


gulpHelper.defineTasks(gulp, { basePath, data: { jsroot: "/modules" } });


gulp.task('makeico', function (cb) {
    new Promise( function(resolve, reject) {
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


gulp.task('compile', ['little-compile', 'makeico'], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('default', [ 'compile' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
});



gulp.task( 'deploy', [ 'little-compileclean' ], function(cb) {
    const pwdPath = process.cwd();
    const imageName = "frickjack/s3cp:1.0.0";
    const commandStr = "yes | docker run --rm --name s3gulp -v littleware:/root/.littleware -v '" +
        pwdPath + ":/mnt/workspace' " + imageName + " -copy /mnt/workspace/build/ s3://apps.frickjack.com/";

    console.log('Running: ' + commandStr);

    exec( commandStr, 
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
});
