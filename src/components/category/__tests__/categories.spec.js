import { expect } from 'chai';
import React from 'react';
import Categories from '../categories';
import CategoryItem from 'src/components/category/category-item';
// import renderShallow from 'render-shallow';
import { renderShallow } from 'lib/test-helpers';
import noop from 'src/utils/noop';
import { findWithType, findAll, findWithClass } from 'react-shallow-testutils';

describe('<Categories>', () => {
    context('when it renders', () => {
        let component;
        let categories = [
            {
                id: '1',
                name: 'my-category-title',
                description: 'my-category-description',
            },
            {
                id: '2',
                name: 'my-category-title2',
                description: 'my-category-description2',
            },
        ];

        const props = {
            onDelete: noop,
            onEdit: noop,
            startOffset: 1,
            startCount: 0,
            perPage: 10,
            categories: categories,
        };

        before(() => {
            component = renderShallow(<Categories { ...props } />).output;
        });

        it('renders category list container', () => {
            // const thead = findWithClass(component, 'theadClass');
            // expect(thead.type).to.equal('thead');
            // expect(thead.props.children.length).to.equal(1);
        });

        it('renders thead', () => {
            const thead = findWithClass(component, 'theadClass');
            expect(thead).to.eql(
                <thead className="theadClass">
                    <tr>
                        <th>
                            <a href="#" >Id</a>
                        </th>
                        <th>
                            <a href="#" >Title </a>
                        </th>
                        <th>
                            <a href="#" >Description </a>
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
            );
        });

    });
});
