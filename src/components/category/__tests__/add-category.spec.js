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
import { findWithType, findWithRef } from 'react-shallow-testutils';

describe('<AddCategory>', () => {

    context('when it renders', () => {
        let component;
        let modal;
        let modalHeader;
        let modalClose;
        let modalBody;
        let modalFooter;
        let div;
        let form;
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
            component= renderShallow(<AddCategory { ...props } />).output;
        });

        it('checks Modal Callback', () => {
            modal= findWithType(component, Modal);
            expect((modal.props.onRequestHide)).to.eql(props.onHideModal);
            expect(modal.props.isOpen).to.be.eql(props.isOpen);
        });

        it('checks ModalHeader Callback', () => {
            modalClose= findWithType(component, ModalClose);
            expect((modalClose.props.onClick)).to.eql(props.onHideModal);
        });

        it('checks ModalHeader body', () => {
            modalHeader= findWithType(component, ModalHeader);
            expect(modalHeader).to.eql(
                <ModalHeader>
                    <ModalClose onClick={ props.onHideModal } />
                    <ModalTitle>Add Category</ModalTitle>
                </ModalHeader>
            );
        });

        it('checks ModalBody', () => {
            modalBody = findWithType(component, ModalBody);
            const title = findWithRef(component, 'title');
            const description = findWithRef(component, 'description');
            
            expect(modalBody).to.eql(
                <ModalBody>
                    <div className={ props.errorClass }>
                        <li key='0'>{ props.message.fail.title }</li>
                        <li key='1'>{ props.message.fail.description }</li>
                    </div>
                    <form role="form">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                ref="title"
                                key={ title.key }
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                ref="description"
                                key={ description.key }
                                className="form-control"
                                rows="3"
                            >
                            </textarea>
                        </div>
                    </form>
                </ModalBody>
            );
        });
    });
});