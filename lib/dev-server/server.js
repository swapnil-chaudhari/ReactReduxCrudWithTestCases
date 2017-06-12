/**
 * @file This is a local dev server using express.
 * Webpack is used to apply some middleware for hot reloading (hot-middleware) and
 * for serving files emitted from webpack (dev-middleware).
 */

/* eslint-disable no-console */

import express from 'express';
import { devConfig as config } from '../../webpack.config';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import path from 'path';
import dotenv from 'dotenv';

/* Loads variables from .env */
dotenv.load();

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

const { WEBPACK_DEV_SERVER_PORT, WEBPACK_DEV_SERVER_HOST } = process.env;

app.listen(WEBPACK_DEV_SERVER_PORT, WEBPACK_DEV_SERVER_HOST, err => {
    if (err)
        console.log(err);

    console.log(`App started at ${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`);
});

app.get('*', (_r, res) => res.sendFile(path.resolve(__dirname, '../../src/index.html')));

export default app;
