/**
 * Project АгропринтCRM
 * Github: https://github.com/ntorgov/agroprint-crm
 * Issues: https://github.com/ntorgov/agroprint-crm/issues
 * License: Commercial
 * Author: Bagdad
 * Created: 16.01.2017
 */
let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist"));
});
