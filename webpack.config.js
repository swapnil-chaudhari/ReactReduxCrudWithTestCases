/* eslint-disable no-var,prefer-template,vars-on-top */
var assign = require('lodash.assign');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackInternationalizationHelpers = require('lib/util/webpack-internationalization-helpers');

var PATHS = {
    BUILD: path.join(__dirname, 'build', process.env.DEPLOY_TIMESTAMP || ''),
    LIB: path.join(__dirname, 'lib'),
    SOURCE: path.join(__dirname, 'src')
};

const extractSass = new ExtractTextPlugin('react-webpack.css');

var config = {
    entry: {
        main: [path.join(PATHS.SOURCE, 'index.js')]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract('style', ['css', 'postcss', 'sass', 'import-glob'])
            }
        ],
        noParse: [
            /node_modules\/sinon\//,
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    resolve: {
        alias: {
            lib: PATHS.LIB,
            sinon: 'sinon/pkg/sinon',
            src: PATHS.SOURCE
        },
        extensions: ['', '.js']
    },
    output: {
        chunkFilename: webpackInternationalizationHelpers.getWebpackChunkFilenamesForLocale(),
        filename: webpackInternationalizationHelpers.getWebpackFilenameForLocale(),
        path: PATHS.BUILD,
        publicPath: '/react-webpack/'
    },
    plugins: [
        extractSass,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.LOCALE': JSON.stringify(webpackInternationalizationHelpers.getLocale()),
            'process.env.LOCALE_MESSAGES': JSON.stringify(
                webpackInternationalizationHelpers.getMessagesForLocale()
            )
        })
    ]
};

var devConfig = assign({}, config, {
    devtool: '#source-map',
    entry: [
        'webpack-hot-middleware/client'
    ].concat(config.entry.main),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ].concat(config.plugins)
});

var testConfig = assign({}, config, {
    module: assign({}, config.module, {
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /(__tests__|__fixtures__|node_modules)\//,
                loader: 'istanbul-instrumenter'
            }
        ]

    }),
    resolve: assign({}, config.resolve, {
        alias: assign({}, config.resolve.alias, {
            fs: 'lib/test-helpers/fs-mock'
        })
    }),
    plugins: [
        // Make sure process.env.LOCALE isn't injected, so we can test locale helpers
        extractSass,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        })
    ]
});

module.exports = config;

module.exports.devConfig = devConfig;

module.exports.testConfig = testConfig;
