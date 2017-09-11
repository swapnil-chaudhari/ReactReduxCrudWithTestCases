import { expect } from 'chai';
import React from 'react';
import EditCategory from '../edit-category';
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
import { findWithType, findWithClass } from 'react-shallow-testutils';

describe.only('<EditCategory>', () => {

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
            component= renderShallow(<EditCategory { ...props } />).output;
            // div= findWithClass(component, 'alert-danger');
            // form= findWithType(component, 'form');
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
                    <ModalTitle>Edit Category</ModalTitle>
                </ModalHeader>
            );
        });

        it('checks ModalBody', () => {
            modalBody= findWithType(component, ModalBody);
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
                                defaultValue={ props.category.name }
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                ref="description"
                                defaultValue={ props.category.description }
                                className="form-control"
                                rows="3"
                            >
                            </textarea>
                        </div>
                    </form>
                </ModalBody>
            );
        });

        it('checks ModalFooter Callback', () => {
            const closeButton= findWithClass(component, 'btn-default');
            const updateButton= findWithClass(component, 'btn-primary');
            const editCategory = {
                title: 'edited category',
                description: 'edited description'
            }
            console.log(handleUpdateCategory);
            // console.log(updateButton.props.onClick);
            // console.log(props.onUpdateCategory);
            expect(closeButton.props.onClick).to.eql(props.onHideModal);
            expect(updateButton.props.onClick).to.eql(noop);
        });

        it('checks ModalFooter body', () => {
            modalFooter= findWithType(component, ModalFooter);
            expect(modalFooter).to.eql(
                <ModalFooter>
                    <button className="btn btn-default" onClick={ noop }>
                        Close
                    </button>
                    <input
                        type="button"
                        onClick={ noop }
                        className="btn btn-primary"
                        value="Update"
                    />
                </ModalFooter>
            );
        });
    });
});