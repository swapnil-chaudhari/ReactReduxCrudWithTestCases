/* eslint-env node */
/* eslint-disable no-var */

var webpackConfig = require('./webpack.config').testConfig;
var os = require('os');

var isOSX = function isOSX() {
    return /darwin/i.test(os.type());
};

module.exports = function karma(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            {
                pattern: 'lib/test-helpers/test-index.js',
                watched: false,
                included: true,
                served: true
            }
        ],
        client: {
            mocha: {
                timeout: isOSX() ? 200 : 2000
            }
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: {
                colors: true
            },
            noInfo: true
        },
        preprocessors: {
            'lib/test-helpers/test-index.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha', 'notify', 'junit', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'build/coverage/',
            subdir: '.'
        },
        junitReporter: {
            outputDir: 'build/',
            outputFile: 'junit.xml',
            useBrowserName: false
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};

/* eslint-enable no-var */
