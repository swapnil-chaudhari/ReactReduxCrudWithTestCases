import { expect } from 'chai';
import React from 'react';
import CategoryItem from 'src/components/category/category-item';
import renderShallow from 'render-shallow';
// import { renderShallow } from 'lib/test-helpers';
import noop from 'src/utils/noop';
import { findWithType } from 'react-shallow-testutils';

describe('<CategoryItem>', () => {
    context('when it renders', () => {
        let component;
        let category = {
            id: '1',
            name: 'my-category-title',
            description: 'my-category-description',
        }
        const props = {
            onEdit: noop,
            onDelete: noop,
            category: category,
        };
        before(() => {
            component = renderShallow(<CategoryItem { ...props } />).output;
        });
        it('renders the content section', () => {
            console.log(component);
            // console.log(modal.props.onRequestHide);
            expect(component.props.onEdit).to.be.empty();
            expect(component.props.onDelete).to.be.empty();
        });
    });
});
