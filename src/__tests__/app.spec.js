import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'src/store';
import Routes from 'src/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderShallow } from 'lib/test-helpers';
import { expect } from 'chai';
import App from 'src/app';

describe('<App>', () => {
    describe('render routes', () => {
        context('When it renders', () => {
            let component;
            let history;

            before(() => {
                component = renderShallow(<App />).output;
                history = syncHistoryWithStore(browserHistory, store);
            });

            it('renders a list of routes', () => {
	         console.log(component);
                expect(component).to.eql(
                    <Provider store={ store }>
                        <Routes history={ browserHistory } />
                    </Provider>
                );
            });
        });
    });
});
