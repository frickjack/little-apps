var gulp = require('gulp');
var clean = require('gulp-rimraf');
var ts = require('gulp-typescript');
var markdown = require('nunjucks-markdown'),
    marked = require('marked');
    //gulpnunjucks = require('gulp-nunjucks');
var sourcemaps = require('gulp-sourcemaps');

// register markdown support with nunjucks
var nunjucksManageEnv = function(env) {
    // The second argument can be any function that renders markdown 
    markdown.register(env, marked);
};

var nunjucksRender = require('gulp-nunjucks-render');

//var tsProject = ts.createProject("tsconfig.json");
//var watch = require( 'gulp-watch' );


gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task( 'compilejs', [], function() {
    gulp.src( "web/**/*.js" ).pipe( gulp.dest( "build/" ) );
});

//
// Server side templating with nunjucks
// see https://zellwk.com/blog/nunjucks-with-gulp/
// Also incorporating markdown support with nunjucks-markdown.
//
gulp.task( 'compilenunjucks', [], function() {
    gulp.src( ["web/**/*.html", "!web/blog/gridDemo.html", "!web/eventTrack/events.html" ] )
    .pipe( nunjucksRender( { manageEnv:nunjucksManageEnv } ) ) // path: [ "web/templates" ], 
    .on('error', console.log)
    .pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compilehtml', [ 'compilenunjucks'], function() {
    gulp.src( "web/blog/*.html" )
    .pipe( gulp.dest( "build/blog/" ) );
});



gulp.task( 'compilecss', [], function() {
    gulp.src( "web/**/*.css" ).pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compileimg', [], function() {
    gulp.src( "web/resources/img/**/*" ).pipe( gulp.dest( "build/resources/img" ) );
});

gulp.task( 'compilebower', [], function() {
    gulp.src( ["node_modules/jasmine-core/**/*","node_modules/font-awesome/**/*"], { base:"node_modules" }  ).pipe( gulp.dest( "build/3rdParty" ) );
});


var tsConfig = {
    //noImplicitAny: true,
    target: "es6"
    // declaration: true
};

gulp.task( 'compilets', [], function() {
    return gulp.src( ['web/**/littleware/arrivalPie/**/*.ts', 'web/**/littleware/test/**/*.ts', 'web/*.ts'])
        //.pipe( sourcemaps.init() )
        .pipe(ts( tsConfig ))
        .js
        //.pipe( sourcemaps.write( "./maps" ) )
        .pipe(gulp.dest("build/"));
});


gulp.task('compile', [ 'compilejs', 'compilets', 'compilehtml', 'compilecss', 'compileimg', 'compilebower' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "web/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('default', [ 'compile' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "web/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('watchts', function () {
    // Endless stream mode 
    return gulp.watch('web/**/*.ts', [ 'compilets' ] );
});

gulp.task( 'watchhtml', function () {
   return gulp.watch( 'web/**/*.html', [ 'compilehtml' ] );     
});

gulp.task( 'watchcss', function () {
   return gulp.watch( 'web/**/*.css', [ 'compilecss' ] );     
});

gulp.task( 'watch', [ 'watchts', 'watchhtml', 'watchcss' ], function() {
});