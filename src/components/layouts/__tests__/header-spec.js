import { expect } from 'chai';
import React from 'react';
import Header from '../header';
import Logo from '../logo';
import SideBar from '../side-bar';
import { renderShallow } from 'lib/test-helpers';

describe('<Header>', () => {
    context('when it renders', () => {
        let component;

        before(() => {
            component = renderShallow(<Header />).output;
        });

        it('returns Header', () => {
            expect(component).to.eql(
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <Logo />
                    <SideBar />
                </nav>
            );
        });
    });
});
