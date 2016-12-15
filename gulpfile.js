var gulp = require('gulp');
var clean = require('gulp-rimraf');

gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return gulp.src("build/*", { read: false }).pipe(clean());
});

gulp.task('default', function() {
  // place code for your default task here
  console.log( "Hello, World!" );
  gulp.src( "web/**/*" ).pipe( gulp.dest( "build/" ) );
});
