import { expect } from 'chai';
import React from 'react';
import EditCategory from '../edit-category';
import renderShallow from 'render-shallow';
// import { renderShallow } from 'lib/test-helpers';
import { spy, stub } from 'sinon';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import * as categoryActions from 'src/actions/category-actions';
import noop from 'src/utils/noop';
import { findAllWithClass, findWithClass } from 'react-shallow-testutils';

describe.only('<EditCategory>', () => {
    let component = '';
    const props = {
        onHideModal: spy(),
        onUpdateCategory: spy(),
        errorClass: 'alert alert-danger',
        isOpen: true,
        category: {
            id: 1,
            name: 'test category',
            description: 'test description'
        },
        message: {
            success:'',
            fail: {
                title: 'Title field is required.',
                description: 'Description field is required.'
            }
        }
    };

    context('when ModalFooter renders & checks hideModal is called.', () => {
        before(() => {
            component = renderShallow(<EditCategory { ...props } />).output;
            const hideButton = findWithClass(component, 'btn-default');
            hideButton.props.onClick();
        });

        it('calls the given onClose function', () => {
          expect(props.onHideModal).to.have.been.called();
        });
    });

    context('when ModalFooter renders & checks updateCategory is called.', () => {
        const editCategory = {
            title: props.category.name,
            description: props.category.description,
        }

        before(() => {
            component = renderShallow(<EditCategory { ...props } />).output;
            const updateCategoryButton = findWithClass(component, 'btn-primary');
            updateCategoryButton.props.onClick(editCategory, props.category.id);
        });

        it('calls the given onUpdateCategory function', () => {
            expect(props.onUpdateCategory).to.have.been.calledOnce.calledWith(editCategory, 1);
        });
    });
});
