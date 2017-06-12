import {
    getLocale,
    getMessagesForLocale,
    getWebpackChunkFilenamesForLocale,
    getWebpackFilenameForLocale
} from '../webpack-internationalization-helpers';
import { expect } from 'chai';
import fs from 'fs';

describe('webpack-internationalization-helpers', () => {

    describe('getLocale', () => {

        context('when process.env.LOCALE is set', () => {
            let lastEnvironmentLocale;
            let locale;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'some-locale';

                locale = getLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns the locale from the environment', () => {
                expect(locale).to.equal('some-locale');
            });

        });

        context('when process.env.LOCALE is not set', () => {
            let lastEnvironmentLocale;
            let locale;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = undefined;

                locale = getLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns the english locale', () => {
                expect(locale).to.eql('en');
            });

        });

        context('when locale is zh-HK', () => {
            let lastEnvironmentLocale;
            let locale;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'zh-HK';

                locale = getLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns the react-intl mapping of zh-Hant-HK', () => {
                expect(locale).to.equal('zh-Hant-HK');
            });

        });

        context('when locale is zh-CN', () => {
            let lastEnvironmentLocale;
            let locale;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'zh-CN';

                locale = getLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns the react-intl mapping of zh-CN', () => {
                expect(locale).to.equal('zh-Hans-CN');
            });
        });

    });

    describe('getMessagesForLocale', () => {

        context('when the locale is english', () => {
            let lastEnvironmentLocale;
            let messages;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;
                process.env.LOCALE = 'en';

                fs.readFileSync.reset();

                messages = getMessagesForLocale();
            });

            after(() => {
                fs.readFileSync.reset();

                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns an empty object', () => {
                expect(messages).to.eql({});
            });

            it('does not read a file', () => {
                expect(fs.readFileSync).not.to.have.been.called();
            });

        });

        context('when the locale is not english', () => {
            let lastEnvironmentLocale;
            let messages;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;
                process.env.LOCALE = 'zh-HK';

                fs.readFileSync.reset();
                fs.readFileSync.returns(`{"locale": "${process.env.LOCALE}"}`);

                messages = getMessagesForLocale();
            });

            after(() => {
                fs.readFileSync.reset();

                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('reads the messages.json for the non-remapped LOCALE', () => {
                expect(fs.readFileSync).to.have.been.calledWith(
                    './locale/zh-HK/LC_MESSAGES/messages.json');
            });

            it('returns a JSON-parsed message', () => {
                expect(messages).to.eql({ locale: 'zh-HK' });
            });

        });

    });

    describe('getWebpackFilenameForLocale', () => {

        context('when the LOCALE is english', () => {
            let lastEnvironmentLocale;
            let webpackFilename;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'en';

                webpackFilename = getWebpackFilenameForLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns a non-LOCALE specific bundle name', () => {
                expect(webpackFilename).to.eql('[name].bundle.js');
            });
        });

        context('when the LOCALE is not english', () => {
            let lastEnvironmentLocale;
            let webpackFilename;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'zh-HK';

                webpackFilename = getWebpackFilenameForLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns a locale-specific bundle name', () => {
                expect(webpackFilename).to.eql('[name].zh-Hant-HK.bundle.js');
            });
        });

    });

    describe('getWebpackChunkFilenamesForLocale', () => {

        context('when the LOCALE is english', () => {
            let lastEnvironmentLocale;
            let webpackChunkFilename;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'en';

                webpackChunkFilename = getWebpackChunkFilenamesForLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns a non-LOCALE specific bundle id', () => {
                expect(webpackChunkFilename).to.eql('[id].bundle.js');
            });
        });

        context('when the LOCALE is not english', () => {
            let lastEnvironmentLocale;
            let webpackChunkFilename;

            before(() => {
                lastEnvironmentLocale = process.env.LOCALE;

                process.env.LOCALE = 'zh-HK';

                webpackChunkFilename = getWebpackChunkFilenamesForLocale();
            });

            after(() => {
                process.env.LOCALE = lastEnvironmentLocale;
            });

            it('returns a locale-specific bundle id', () => {
                expect(webpackChunkFilename).to.eql('[id].zh-Hant-HK.bundle.js');
            });
        });

    });

});
