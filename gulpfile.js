const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const debug = require( 'gulp-debug' );
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const revManifestPath = "rev-manifest.json";
const clean = require('gulp-rimraf');
const ts = require('gulp-typescript');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const nunjucksRender = require('gulp-nunjucks-render');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('child_process').exec;
const mkdirp = require( 'mkdirp' );
const gulpHelper = require('./gulpHelper');
const basePath = "src/@littleware/little-apps";


gulpHelper.defineTasks( { basePath } );


gulp.task('makeico', function (cb) {
    new Promise( function(resolve, reject) {
        const path = "build/resources/img/appIcons"; 
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
                        pngPath: folderStr + "/oo511." + rez + "x" + rez + ".png",
                        rez:rez
                    };
                }
            ).map(
                (info) => {
                    return new Promise( function(resolve,reject) {
                        const commandStr = 'inkscape src/resources/img/511.svg --export-png ' + info.pngPath + " -w" + info.rez + " -h" + info.rez;
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

gulp.task( 'compileimg', [], function() {
    gulp.src( "src/resources/img/**/*" ).pipe( gulp.dest( "site/resources/img" ) );
});

gulp.task( 'compilebower', [], function() {
    gulp.src( ["node_modules/jasmine-core/**/*", "node_modules/font-awesome/**/*",
                "node_modules/webcomponentsjs/**/*", 
                "node_modules/@littleware/little-elements/**/*"
             ], 
            { base:"node_modules" }  ).pipe( gulp.dest( "site/modules" ) 
            );
});


gulp.task('compile', [ 'compilehtml', 'compileimg', 'compilebower' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('default', [ 'compile' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "src/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('watchts', function () {
    // Endless stream mode 
    return gulp.watch('src/**/*.ts', [ 'compilehtml' ] );
});

gulp.task( 'watchhtml', function () {
   return gulp.watch( 'src/**/*.html', [ 'compilehtml' ] );     
});

gulp.task( 'watchcss', function () {
   return gulp.watch( 'src/**/*.css', [ 'compilehtml' ] );     
});

gulp.task( 'watch', [ 'watchts', 'watchhtml', 'watchcss' ], function() {
});

gulp.task( 'compileclean', function(cb) {
    return gulpSequence( 'clean', 'compile', 'makeico' )(cb);
});

gulp.task( 'deploy', [ 'compileclean' ], function(cb) {
    const pwdPath = process.cwd();
    const imageName = "frickjack/s3cp:1.0.0";
    const commandStr = "yes | docker run --rm --name s3gulp -v littleware:/root/.littleware -v '" +
        pwdPath + ":/mnt/workspace' " + imageName + " -copy /mnt/workspace/build/ s3://apps.frickjack.com/";

    console.log( "Running: " + commandStr );

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
