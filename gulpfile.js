var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

//  Start Browser
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'build',
			directory: true
		},
	})
})

// Error Handler
var onError = function (err) {
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	})(err);
	this.emit('end');
}

//  Data
var globalData = {
	cdeworld: require('./src/data/cdeworld.json'),
	cdwebooks: require('./src/data/ebooks.json')
};

// Templating
gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
	return gulp.src('src/emails/**/*.+(html|nunjucks)')
		.pipe(plumber({ errorHandler: onError }))
		// Pulls data from json file
		.pipe(data(function() {
			return globalData;
		}))
		//.pipe(inlineCss())
		.pipe(nunjucksRender({
			path: ['src/templates']
		}))
		// Output files in app folder
		.pipe(gulp.dest('build'))
});

gulp.task('watch', ['nunjucks', 'browserSync'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('build/**/*.html', browserSync.reload);
	gulp.watch(['src/templates/**/*.nunjucks', 'src/emails/**/*.nunjucks'], ['nunjucks'], browserSync.reload);
});