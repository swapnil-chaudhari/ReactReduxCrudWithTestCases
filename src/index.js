/**
 * @file Entry file for webpack to bundle into main.bundle.js and renders the outermost wrapper
 * component.
 */

import React from 'react';
import App from './app';
import { addLocaleData, IntlProvider } from 'react-intl';
import { render } from 'react-dom';


/**
 * User's locale.
 *
 * @type {string}
 */
const locale = process.env.LOCALE || 'en';

/**
 * Base locale.
 *
 * The base locale is the root of a locale (for instance: fr-BE, fr-CA
 * will have for base locale fr). The details of fr-BE will be contained
 * in the module imported from react-intl (see below).
 *
 * @type {string}
 */
const baseLocale = locale.split('-')[0] || 'en';

/**
 * Messages.
 *
 * @type {string}
 */
const messages = process.env.LOCALE_MESSAGES || {};

/**
 * Locale information.
 *
 * @type {Object}
 */
const localeData = require(`react-intl/locale-data/${baseLocale}`);
addLocaleData(localeData);


/**
 * Renders the application.
 *
 * @param {Object} appRootDomElement - the DOM node to attach the react
 *      application to.
 */
exports.renderApplication = (appRootDomElement) => {
    render(
        <IntlProvider locale={ locale } messages={ messages }>
            <App />
        </IntlProvider>,
        appRootDomElement);
        // document.getElementById('main'));
};


// TODO: remove this todo and replace AppName with your application name.
window.initAppName = exports.renderApplication;
