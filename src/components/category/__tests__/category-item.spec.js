import { expect } from 'chai';
import React from 'react';
import CategoryItem from 'src/components/category/category-item';
import renderShallow from 'render-shallow';
import { spy } from 'sinon';
import { findWithClass } from 'react-shallow-testutils';

describe('<CategoryItem>', () => {
    const category = {
        id: '1',
        name: 'my-category-title',
        description: 'my-category-description',
    }

    const props = {
        onEdit: spy(),
        onDelete: spy(),
        category,
    };

    context('when edit category button is clicked', () => {
        before(() => {
            const component = renderShallow(<CategoryItem { ...props } />).output;
            const editLink = findWithClass(component, 'btn-warning');
            editLink.props.onClick();
        });

        it('edits category', () => {
            expect(props.onEdit).to.have.been.calledWith(props.category.id);
        });

    });

    context('when delete category button is clicked', () => {
        before(() => {
            const component = renderShallow(<CategoryItem { ...props } />).output;
            const deleteLink = findWithClass(component, 'btn-danger');
            deleteLink.props.onClick();
        });

        it('deletes category', () => {
            expect(props.onDelete).to.have.been.calledWith(props.category.id);
        });

    });
});
