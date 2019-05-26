var gulp = require('gulp');
var del = require('del');
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
			mode: "production",
			module: {
				rules: [{
					test: /\.js$/,
					exclude: /node_modules\/(?!bullets-js)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@vue/babel-preset-jsx']
						}
					}
				}]
			}
		}))
		.pipe(gulp.dest('public/js/dist/'));
});

gulp.task('default', ['build']);
