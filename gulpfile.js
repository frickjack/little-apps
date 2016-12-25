var gulp = require('gulp');
var clean = require('gulp-rimraf');
var ts = require('gulp-typescript');
//var tsProject = ts.createProject("tsconfig.json");
//var watch = require( 'gulp-watch' );


gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task( 'compilejs', [], function() {
    gulp.src( "web/**/*.js" ).pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compilehtml', [], function() {
    gulp.src( "web/**/*.html" ).pipe( gulp.dest( "build/" ) );
});

gulp.task( 'compilecss', [], function() {
    gulp.src( "web/**/*.css" ).pipe( gulp.dest( "build/" ) );
});

var tsConfig = {
    //noImplicitAny: true,
    target: "es6"
    // declaration: true
};

gulp.task( 'compilets', [], function() {
    return gulp.src( 'web/**/littleware/arrivalPie/*.ts')
        .pipe(ts( tsConfig ))
        .js.pipe(gulp.dest("build/"));
});


gulp.task('compile', [ 'compilejs', 'compilets', 'compilehtml', 'compilecss' ], function() {
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
