import { expect } from 'chai';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { renderShallow } from 'lib/test-helpers';
import Category from 'src/components/category/category';
import Routes from 'src/routes';

describe('<Routes>', () => {
    context('rendering', () => {
        let component;
        before(() => {
            component = renderShallow(<Routes history={ browserHistory } />).output;
        });

        it('renders a <Router>', () => {
            expect(component.type).to.equal(Router);
        });

        it('uses react-router`s browser history', () => {
            expect(component.props.history).to.equal(browserHistory);
        });

        it('renders the default index route', () => {
            console.log(component);
            expect(component).to.include(
                <Route
                    path="/"
                    component={ Category }
                />
             );
        });

        it('renders the /category route', () => {
            expect(component).to.include(
                <Route
                    path="/categories"
                    component={ Category }
                />
            );
        });
    });

});
