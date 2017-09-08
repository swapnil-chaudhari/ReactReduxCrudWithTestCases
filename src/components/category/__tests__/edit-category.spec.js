import { expect } from 'chai';
import React from 'react';
import EditCategory from '../edit-category';
import renderShallow from 'render-shallow';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import noop from 'src/utils/noop';
import { findWithType, findWithClass } from 'react-shallow-testutils';

describe('<EditCategory>', () => {

    context('when it renders', () => {
        let component;
        let modal;
        let modalHeader;
        const props = {
            onHideModal: noop,
            onUpdateCategory: noop,
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

        before(() => {
            component = renderShallow(<EditCategory { ...props } />).output;
            modal = findWithType(component, Modal);
            modalHeader = findWithType(modal, ModalHeader);
        });

        it('renders div container', () => {
            const div = findWithClass(component, 'container');
            expect(div.type).to.equal('div');
        });

        it.only('render ModalHeader', () => {
            console.log(modalHeader);
            expect(modalHeader).to.equal(
                <ModalHeader>
                    <ModalClose onClick={ props.onHideModal } />
                    <ModalTitle>Edit Category</ModalTitle>
                </ModalHeader>
            );
        });

        it('renders modal wrapper', () => {
            expect(modal.props.isOpen).to.be.true();
            expect(modal.props.onRequestHide).to.be.a('function');
            expect(modal.props.children[0].type).to.equal(ModalHeader)
            expect(modal.props.children[1].type).to.equal(ModalBody)
            expect(modal.props.children[2].type).to.equal(ModalFooter)
        });

        it('displays a modal with header, body and footer', () => {

            let numberOfElementsInModal = modal.props.children.length;
            expect(numberOfElementsInModal).to.equal(3);
        });

        it('displays a modal heading with a title and close button', () => {
            let numberOfElementsInModalHeader = component.props.children.props.children[0].props.children.length;
            expect(numberOfElementsInModalHeader).to.equal(2);
        });
    });
});
