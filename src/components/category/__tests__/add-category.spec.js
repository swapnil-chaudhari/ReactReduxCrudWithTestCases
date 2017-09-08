import { expect } from 'chai';
import React from 'react';
import AddCategory from '../add-category';
import { renderShallow } from 'lib/test-helpers';
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

describe('<AddCategory>', () => {

    context('when it renders', () => {
        let component;
		let modal;
		const props = {
			onHideModal: noop,
			onSaveCategory: noop,
			errorClass: 'alert alert-danger',
			isOpen: true,
            message: {
                success:'',
                fail: {
                    title: 'Title field is required.',
                    description: 'Description field is required.'
                }
            }
		};

        before(() => {
            component = renderShallow(<AddCategory { ...props } />).output;
			modal = findWithType(component, Modal);
        });

        it('renders div container', () => {
            console.log(component);
            const div = findWithClass(component, 'container');
            expect(div.type).to.equal('div');
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
