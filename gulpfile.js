/*
* @Author: bgressier
* @Date:   2019-05-20 11:36:14
* @Last Modified by:   bgressier
* @Last Modified time: 2019-05-22 11:29:19
*/

var gulp = require('gulp');
// var sourcemaps = require("gulp-sourcemaps");
// var concat = require('gulp-concat');
var del = require('del');
// var babel = require('gulp-babel');
var webpack = require('webpack-stream');

gulp.task('clean', function () {
	return del(['public/js/dist/']);
});


gulp.task('build', ['clean'], function() {
	return gulp.src('public/js/src/*.js')
		.pipe(webpack({
			output: {
				path: __dirname + '/public/js/dist/',
				filename: 'app.js'
			},
			devtool: "sourcemap",
			module: {
				rules: [{
					test: /\.js$/,
					exclude: /node_modules\/(?!bullets-js)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			}
		}))
		// .pipe(sourcemaps.init())
		// .pipe(babel())
		// .pipe(concat('app.js'))
		// .pipe(sourcemaps.write("."))
		.pipe(gulp.dest('public/js/dist/'));
});

gulp.task('default', ['build']);
