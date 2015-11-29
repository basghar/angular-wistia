var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('js:concat', function() {
    return gulp.src(['./src/js/wistia.module.js', './src/js/**/*.js', '!./src/js/**/*.spec.js'])
        .pipe(concat('angular-wistia.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['js:concat'], function() {
    // place code for your default task here
});
