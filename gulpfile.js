/*eslint-disable node/no-unpublished-require*/

const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const nodemon = require("gulp-nodemon");

const concat = require("gulp-concat");
const uglify = require("gulp-uglifyjs");

/*eslint-enable node/no-unpublished-require*/

gulp.task("scss", function(done) {
	let plugins = [
		autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
			cascode: true
		}),
		cssnano()
	];
	gulp
		.src("dev/scss/**/*.scss")
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(gulp.dest("public/stylesheets"));
	done();
});

gulp.task("nodemon", function(done) {
	nodemon({
		script: "app.js",
		ext: "js html",
		done: done
	});
});

gulp.task("scripts", function(done) {
	gulp
		.src(["dev/js/auth.js", "dev/js/post.js", "dev/js/comment.js"])
		.pipe(concat("scripts.js"))
		//.pipe(uglify())
		.pipe(gulp.dest("public/javascripts"));
	done();
});

gulp.task(
	"default",
	gulp.parallel("scss", "scripts", "nodemon", function(done) {
		gulp.watch("dev/scss/**/*.scss", gulp.parallel(["scss"]));
		gulp.watch("dev/js/**/*.js", gulp.parallel(["scripts"]));
		done();
	})
);
