import { expect } from 'chai';
import React from 'react';
import Category from '../category';
import Header from 'src/components/layouts/header';
import Content from 'src/components/category/content';
import { renderShallow } from 'lib/test-helpers';

describe('<Category>', () => {
    context('when it renders', () => {
        let component;

        before(() => {
            component = renderShallow(<Category />).output;
        });
        
        it('returns Category', () => {
            expect(component).to.eql(
                <div id="wrapper">
                    <Header />
                    <Content />
                </div>
            );
        });
    });
});
