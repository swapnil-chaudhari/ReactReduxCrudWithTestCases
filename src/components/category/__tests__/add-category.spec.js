import { expect } from 'chai';
import React from 'react';
import AddCategory from '../add-category';
import renderShallow from 'render-shallow';
// import { renderShallow } from 'lib/test-helpers';
import {
        Modal,
        ModalHeader,
        ModalTitle,
        ModalClose,
        ModalBody,
        ModalFooter
    } from 'react-modal-bootstrap';
import noop from 'src/utils/noop';
import { findWithType } from 'react-shallow-testutils';

describe('<AddCategory>', () => {
    context('when it renders with props', () => {
        let component;
        let modal;
        const props = {
            onHideModal: noop,
            onSaveCategory: noop,
            errorClass: 'alert alert-danger',
            isOpen: true,
        };
        before(() => {
            component = renderShallow(<AddCategory { ...props } />).output;
            modal = findWithType(component, Modal);
        });
        it('renders the Modal wrapper', () => {
            expect(modal.props.isOpen).to.be.true();
            expect(modal.props.onRequestHide === props.onHideModal);
            // expect(modal.props.onRequestHide).to.eql(props.onHideModal);
        });

        it.only('displays a modal heading with a title and close button', () => {
            console.log(modal);
            expect(component).to.include(
                <ModalHeader>
                    <ModalClose onClick={ props.onHideModal } />
                    <ModalTitle>Add Category</ModalTitle>
                </ModalHeader>
            );
        });
    });
});
