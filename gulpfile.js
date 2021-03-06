const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('buildLib', () => {
	return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/react/react.js',
            'bower_components/react/react-dom.js',
            'bower_components/socket.io-client/socket.io.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('compilejsx', () => {
    var modules = [
        'common',
        'login',
        'signup',
        'chat'
    ];
    modules.forEach((module) => {
        gulp.src(['src/js/' + module + '/componenets.jsx', 'src/js/' + module + '/app.jsx'])
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['es2015', 'react']
            }))
            .pipe(gulp.dest('assets/js/' + module ));
    });
});

gulp.task('buildSASS', () => {
    return gulp.src('src/styles/main.scss')
            .pipe(sass())
            .pipe(gulp.dest('assets/css/'));
});

gulp.task('default', ['buildLib', 'buildSASS', 'compilejsx']);
