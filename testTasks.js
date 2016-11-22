"use strict";
const isparta = require("isparta");
const runSequence = require("run-sequence");
const istanbul = require("gulp-istanbul");
const path = require("path");
const gutil = require("gulp-util");
const mocha = require("gulp-mocha");
const {argv} = require("yargs");
// Files to process
const SETUP_FILES = "testing/setups/*.js";
const TEST_FILES = "testing/specs/**/*.js";
const TEARDOWN = "testing/teardowns/**/*.js";
const SRC_FILES = "src/**/*.js";

module.exports = function(gulp) {
    /*
     * Instrument files using istanbul and isparta
     */
    // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulopt)
    gulp.task("coverage:instrument", function() {
        return gulp.src(SRC_FILES)
            .pipe(istanbul({
                instrumenter: isparta.Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
                includeUntested: true
            }))
            .pipe(istanbul.hookRequire()); // Force `require` to return covered files
    });

    /*
     * Write coverage reports after test success
     */
    gulp.task("coverage:report", function(done) {
        return gulp.src(SRC_FILES, {
            read: false
        })
            .pipe(istanbul.writeReports({
                // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulwritereportsopt)
                dir: "./quality/coverage",
                reporters: ["html"],
                reportOpts: {
                    dir: "./quality/coverage"
                }
            }));
    // .pipe(istanbul.enforceThresholds({
    //     thresholds: {
    //         global: {
    //             statements: 80,
    //             branches: 65,
    //             lines: 80,
    //             functions: 80
    //         }
    //     }
    // }));
    });

    /**
     * Run unit tests
     */
    gulp.task("test", function() {
        process.env.NODE_ENV = "test";
        process.env.CONFIG = "integration";
        global.__integration = argv.i;
        global.__app = path.join(__dirname, "../lib/");
        global.__helpers = path.join(__dirname, "../testing/helpers/");
        global.__resources = path.join(__dirname, "../testing/resources/");
        global.__setups = path.join(__dirname, "../testing/setups/");
        return gulp.src([SETUP_FILES, TEST_FILES, TEARDOWN], {
            read: false
        }).pipe(mocha({}));
    });

    /**
     * Run unit tests with code coverage
     */
    gulp.task("test:coverage", function(done) {
        runSequence("coverage:instrument", "test", "coverage:report", done);
    });

    /**
     * Watch files and run unit tests on changes
     */
    gulp.task("tdd", function(done) {
        gulp.watch([
            SETUP_FILES,
            TEST_FILES,
            SRC_FILES
        ], ["test"]).on("error", gutil.log);
    });

    gulp.task("tdd:coverage", function(done) {
        // Don't want functional tests during tdd
        gulp.watch([
            SETUP_FILES,
            TEST_FILES,
            SRC_FILES
        ], ["test:coverage"]).on("error", gutil.log);
    });
};
