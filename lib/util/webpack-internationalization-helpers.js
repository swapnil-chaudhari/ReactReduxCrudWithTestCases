/* eslint-disable no-var, no-param-reassign, no-unused-expressions, func-style */

/**
 * Utility functions for loading internationalization bundles via webpack
 */

var fs = require('fs');

var ENGLISH_LOCALE = 'en';

function mapLocalesFromPoe(locale) {
    switch (locale) {
        case 'zh-HK':
            return 'zh-Hant-HK';
        case 'zh-CN':
            return 'zh-Hans-CN';
        default:
            return locale;
    }
}

function getRawLocale() {
    return process.env.LOCALE || ENGLISH_LOCALE;
}

function getLocale() {
    return mapLocalesFromPoe(getRawLocale());
}

function getMessagesForLocale(locale) {
    locale || (locale = getLocale());

    return (locale === ENGLISH_LOCALE) ? {} : JSON.parse(
        fs.readFileSync(`./locale/${getRawLocale()}/LC_MESSAGES/messages.json`)
    );
}

function getWebpackChunkFilenamesForLocale(locale) {
    locale || (locale = getLocale());
    return (locale === ENGLISH_LOCALE) ? '[id].bundle.js' : `[id].${locale}.bundle.js`;
}

function getWebpackFilenameForLocale(locale) {
    locale || (locale = getLocale());
    return (locale === ENGLISH_LOCALE) ? '[name].bundle.js' : `[name].${locale}.bundle.js`;
}

module.exports = {
    getLocale,
    getMessagesForLocale,
    getWebpackFilenameForLocale,
    getWebpackChunkFilenamesForLocale
};
