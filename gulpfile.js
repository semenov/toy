var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var express = require('express');
var livereload = require('gulp-livereload');
var fs = require('fs');
var yargs = require('yargs');
var glob = require('glob');

var paths = {
	scripts: ['run.js', './core/*.js', './components/**/*.js'],
	styles: './components/**/*.css'
}

gulp.task('scripts', function() {
	var componentFiles = glob.sync('./components/**/*.js');
	var b = browserify({
		basedir: __dirname
	});

	b.add('./run.js');
	componentFiles.forEach(function(file) {
		b.require(file);
	});

    b.bundle({ debug: true })
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/assets'))
		.pipe(livereload());
});

gulp.task('styles', function() {
	gulp.src(paths.styles)
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./public/assets'))
		.pipe(livereload());
});

gulp.task('serve', function() {
	var app = express();
	app.use(express.static(__dirname + '/public'));
	app.listen(3000);
});

gulp.task('dev', function() {
	var app = express();
	app.use(express.static(__dirname + '/public'));
	app.listen(4000);
});

gulp.task('component:create', function() {
	var argv = yargs.demand('name').argv;
	var componentName = argv.name;
	var dir = './components/' + componentName;
	fs.mkdirSync(dir);
	fs.writeFileSync(dir + '/' + componentName + '.js', '');
	fs.writeFileSync(dir + '/' + componentName + '.css', '');
});

gulp.task('component:rename', function() {
	var argv = yargs
		.demand('old-name')
		.demand('new-name')
		.argv;

	var oldName = argv['old-name'];
	var newName = argv['new-name'];

	var oldDir = './components/' + oldName;
	var newDir = './components/' + newName;

	fs.renameSync(oldDir, newDir);
	fs.renameSync(newDir + '/' + oldName + '.js', newDir + '/' + newName + '.js');
	fs.renameSync(newDir + '/' + oldName + '.css', newDir + '/' + newName + '.css');
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
});


gulp.task('default', ['scripts', 'styles', 'serve', 'watch']);
