var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var autoprefixer = require ( 'gulp-autoprefixer' );
var sourcemaps = require ( 'gulp-sourcemaps' );
var browserSync = require( 'browser-sync' ).create();
var reload = browserSync.reload;

var htmlWatch = '**/*.html';

var imageSrc = './src/images/**/*';
var imageDist = './dist/images/';
var imageWatch = './src/images/**/*.*'

var fontsSrc = './src/fonts/**/*';
var fontsDist = './dist/fonts/';
var fontsWatch = './src/fonts/**/*.*'

var styleSrc = './src/scss/style.scss';
var styleDist = './dist/css/';
var styleWatch = './src/scss/**/*.scss';

var jsSrc = './src/js/app.js';
var jsDist = './dist/js/';
var jsWatch = './src/js/**/*.js';

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "./",
			open: false,
			injectChanges: true
		}
	});
})

gulp.task( 'js', function(){
	gulp.src( jsSrc )
	.pipe( sourcemaps.init({ loadMaps:true}) )
	.pipe( rename ({ extname: '.min.js' }) )
	.pipe( uglify() )
	.pipe( sourcemaps.write('./') )
	.pipe( gulp.dest(jsDist) )
	.pipe( browserSync.stream() );
})

gulp.task('styles', function(){
	gulp.src( styleSrc )
	.pipe( sourcemaps.init() )
	.pipe( sass({
		errorLogToConsole:true,
		outputStyle: 'compressed'
	}) )
	.on( 'error', console.error.bind( console ) )
	.pipe( autoprefixer({
		browsers: ['last 4 versions'],
    cascade: false
		}) )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( sourcemaps.write( './' ))
	.pipe( gulp.dest( styleDist ) )
	.pipe( browserSync.stream() );
})

gulp.task('images', function(){
	gulp.src( imageSrc )
	.pipe( gulp.dest( imageDist) )
})

gulp.task( 'default', [ 'styles', 'js' ] );

gulp.task( 'watch', [ 'default', 'browser-sync' ], function(){
	gulp.watch( styleWatch, ['styles'] );
	gulp.watch( jsWatch, ['js']);
	gulp.watch( imageWatch, ['images']);
	gulp.watch( htmlWatch, reload );
} )