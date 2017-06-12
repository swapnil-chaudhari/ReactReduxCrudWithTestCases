import { expect } from 'chai';
import { stub } from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import index from '../index';
import App from '../app';


describe('Application entry point', () => {

    // TODO: remove this todo and replace AppName with your application name.
    describe('window.initAppName', () => {

        it('is a direct public proxy to render application', () => {
            expect(window.initAppName).to.eql(index.renderApplication);
        });

    });

    describe('Application', () => {

        context('when it renders', () => {
            const body = document.body;
            const locale = process.env.LOCALE || 'en';

            before(() => {
                stub(ReactDOM, 'render');
                index.renderApplication(body);
            });

            after(() => {
                ReactDOM.render.restore();
            });

            it('renders <App> inside the root dom element', () => {
                expect(ReactDOM.render).to.have.been.calledWith(
                    <IntlProvider locale={ locale } messages={ {} }>
                        <App />
                    </IntlProvider>, body);
            });

        });

    });
});
