import { expect } from 'chai';
import React from 'react';
import Header from 'src/components/layouts/header';
import SideBar from 'src/components/layouts/side-bar';
import Logo from 'src/components/layouts/logo';
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
