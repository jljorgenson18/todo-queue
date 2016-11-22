'use strict';

// Transform all required files with Babel
require('babel-register');
// Turning off warnings because #yolo
require('bluebird').config({
    warnings: false
});

const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const eslintFormatter = require('eslint-friendly-formatter');
const esformatter = require('esformatter');
const runSequence = require('run-sequence');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const esformatterOptions = require('./esformatterOptions');
const webpackConfigDev = require('./webpack.config.dev.js');
const webpackConfigProd = require('./webpack.config.prod.js');

const browserSync = require('browser-sync').create();

const allJs = [
    'src/**/*.js',
    '*.js',
    'testing/**/*.js'
];

// Split up tasks
require('./testTasks')(gulp);

gulp.task('lint', function() {
    return gulp.src(allJs)
        .pipe(eslint('./.eslintrc'))
        .pipe(eslint.format(eslintFormatter))
        .pipe(eslint.result(result => {
            const warningCount = result.warningCount;
            const errorCount = result.errorCount;
            if((warningCount + errorCount) === 0) {
                gutil.log('Eslint found', gutil.colors.green('no issues'));
            } else {
                let warningStr = (warningCount === 1) ? ' warning,' : ' warnings,';
                let errorStr = (errorCount === 1) ? ' error,' : ' errors';
                gutil.log('Eslint found', gutil.colors.yellow(result.warningCount + warningStr), gutil.colors.red(result.errorCount + errorStr));
            }
        }));
});

gulp.task('webpack:dev', function(done) {
    // run webpack
    webpack(webpackConfigDev, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task('webpack:prod', function(done) {
    // run webpack
    webpack(webpackConfigProd, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task('build:dev', done => {
    runSequence('test:coverage', 'webpack:dev', done);
});

gulp.task('build:prod', done => {
    runSequence('test:coverage', 'webpack:prod', done);
});


gulp.task('default', () => {
    // lints and beautifies src files
    gulp.watch(allJs).on('change', file => {
        try {
            let ogFile = fs.readFileSync(file.path).toString();
            let newFile = esformatter.format(ogFile, esformatter.rc(file.path, esformatterOptions));
            if(ogFile !== newFile) {
                fs.writeFileSync(file.path, newFile);
            }
        } catch (e) {
            console.error(e);
        }
        gulp
            .src(file.path)
            .pipe(eslint('./.eslintrc'))
            .pipe(eslint.format(eslintFormatter))
            .pipe(eslint.result(result => {
                const warningCount = result.warningCount;
                const errorCount = result.errorCount;
                if((warningCount + errorCount) === 0) {
                    gutil.log('Eslint found', gutil.colors.green('no issues'));
                } else {
                    let warningStr = (warningCount === 1) ? ' warning,' : ' warnings,';
                    let errorStr = (errorCount === 1) ? ' error,' : ' errors';
                    gutil.log('Eslint found', gutil.colors.yellow(result.warningCount + warningStr), gutil.colors.red(result.errorCount + errorStr));
                }
            }));
    });
    // Use this for reference
    // https://github.com/BrowserSync/recipes/tree/master/recipes/webpack.react-hot-loader
    const bundler = webpack(webpackConfigDev);
    browserSync.init({
        server: {
            baseDir: './',
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfigDev.output.publicPath,
                    historyApiFallback: true,
                    stats: {
                        modules: false,
                        chunks: false,
                        colors: true
                    }
                }),
                webpackHotMiddleware(bundler)
            ]
        },
        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: [
            'index.html'
        ],
        open: false
    });
});
