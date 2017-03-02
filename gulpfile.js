var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

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

// CSS Inline
gulp.task('sassInline', function() {
	return gulp.src('build/**/*.html')
		.pipe(inlineCss({
			applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
		}))
		.pipe(gulp.dest('build/'));
});

//  Data
var globalData = {
	cdeworld: require('./src/data/cdeworld.json'),
	cdwebooks: require('./src/data/ebooks.json')
};

// Compiling Sass into CSS
gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
  	.pipe(plumber({ errorHandler: onError }))
  	//.pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
	    stream: true
    }));
});

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

gulp.task('inline', function() {
	return gulp.src('build/**/*.html')
		.pipe(inlineCss())
		.pipe(gulp.dest('build'));
});

gulp.task('watch', ['nunjucks', 'browserSync', 'sass'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('build/**/*.html', browserSync.reload);
	gulp.watch(['src/templates/**/*.nunjucks', 'src/emails/**/*.nunjucks'], ['nunjucks'], browserSync.reload);
});

gulp.task('deploy', ['sassInline'], function() {
	
});