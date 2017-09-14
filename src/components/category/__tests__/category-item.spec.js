import { expect } from 'chai';
import React from 'react';
import CategoryItem from 'src/components/category/category-item';
import renderShallow from 'render-shallow';
// import { renderShallow } from 'lib/test-helpers';
import noop from 'src/utils/noop';
import { findWithType, findAll, findWithClass } from 'react-shallow-testutils';

describe('<CategoryItem>', () => {
    context('when it renders', () => {
        let component;
        let tr;
        let editLink;
        let deleteLink;
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
            tr = findWithType(component, 'tr');
            editLink = findWithClass(component, 'btn-danger');
            deleteLink = findWithClass(component, 'btn-danger');
        });

        it.only('checks anchor tag callback', () => {
            console.log(editLink.props.onClick);
            expect(editLink.props.onClick).to.eql({ noop });
        });

        it('renders <tr> with all <td>s', () => {
            const tds = findAll(component, (element) => element.type === 'td');
            expect(tds.length).to.equal(4);
        });

        it('renders <tr> with <td>s', () => {
            expect(tr.props.children[0]).to.eql(<td>{ props.category.id }</td>);
            expect(tr.props.children[1]).to.eql(<td>{ props.category.name }</td>);
            expect(tr.props.children[2]).to.eql(<td>{ props.category.description }</td>);
        });

        it('validate Edit and Delete button', () => {
            expect(tr.props.children[3].props.children.length).to.equal(2);
            expect(findWithClass(component, 'btn-warning').props.children).to.eql('EDIT');
            expect(findWithClass(component, 'btn-danger').props.children).to.eql('DELETE');
        });

    });
});
