var gulp = require('gulp');
var clean = require('gulp-rimraf');
var ts = require('gulp-typescript');
var markdown = require('nunjucks-markdown'),
    marked = require('marked');
var nunjucksRender = require('gulp-nunjucks-render');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var mkdirp = require( 'mkdirp' );
 
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
  

// register markdown support with nunjucks
var nunjucksManageEnv = function(env) {
    // The second argument can be any function that renders markdown 
    markdown.register(env, marked);
};

//var env = new nunjucks.Environment(new nunjucks.FileSystemLoader("."));
//markdown.register(env, marked);

//var tsProject = ts.createProject("tsconfig.json");
//var watch = require( 'gulp-watch' );


gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task( 'compilejs', [], function() {
    gulp.src( "src/**/*.js" ).pipe( gulp.dest( "build/" ) );
});

//
// Server side templating with nunjucks
// see https://zellwk.com/blog/nunjucks-with-gulp/
// Also incorporating markdown support with nunjucks-markdown.
//
gulp.task( 'compilenunjucks', [], function() {
    gulp.src( ["src/**/*.html", "!src/eventTrack/events.html" ] )
    .pipe( nunjucksRender( { manageEnv:nunjucksManageEnv, envOptions:{autoescape:false}, path: [ "src" ] } ) ) // path: [ "src/templates" ], 
    .on('error', console.log)
    .pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compilehtml', [ 'compilenunjucks'], function() {
    gulp.src( ["src/blog/*.*"], { base:"src" } )
    .pipe( gulp.dest( "build/" ) );
});



gulp.task( 'compilecss', [], function() {
    gulp.src( "src/**/*.css" ).pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compileimg', [], function() {
    gulp.src( "src/resources/img/**/*" ).pipe( gulp.dest( "build/resources/img" ) );
});

gulp.task( 'compilebower', [], function() {
    gulp.src( ["node_modules/jasmine-core/**/*","node_modules/font-awesome/**/*"], { base:"node_modules" }  ).pipe( gulp.dest( "build/3rdParty" ) );
});


var tsConfig = {
    //noImplicitAny: true,
    target: "es6",
    sourceMap: true
    // declaration: true
};

gulp.task( 'compilets', [], function() {
    return gulp.src( ['src/resources/js/littleware/arrivalPie/**/*.ts', 
            'src/resources/js/littleware/test/**/*.ts',
            'src/resources/js/littleware/headerSimple/**/*.ts', 
            'src/511/**/*.ts',
            'src/*.ts'], 
            { base:"src" })
        //.pipe( sourcemaps.init() )
        .pipe(ts( tsConfig ))
        .js
        //.pipe( sourcemaps.write( "./maps" ) )
        .pipe(gulp.dest("build/"));
});


gulp.task('compile', [ 'compilejs', 'compilets', 'compilehtml', 'compilecss', 'compileimg', 'compilebower' ], function() {
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
    return gulp.watch('src/**/*.ts', [ 'compilets' ] );
});

gulp.task( 'watchhtml', function () {
   return gulp.watch( 'src/**/*.html', [ 'compilehtml' ] );     
});

gulp.task( 'watchcss', function () {
   return gulp.watch( 'src/**/*.css', [ 'compilecss' ] );     
});

gulp.task( 'watch', [ 'watchts', 'watchhtml', 'watchcss' ], function() {
});