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
import noop from 'src/utils/noop';
import { findWithType, findWithClass } from 'react-shallow-testutils';

describe('<EditCategory>', () => {
    context('when it renders', () => {
        let component;
        let modal;
        let modalHeader;
        let modalClose;
        let modalBody;
        let modalFooter;
        let closeButton;
        let updateButton;
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
            modalClose = findWithType(component, ModalClose);
            modalHeader = findWithType(component, ModalHeader);
            modalBody = findWithType(component, ModalBody);
            closeButton = findWithClass(component, 'btn-default');
            updateButton = findWithClass(component, 'btn-primary');
            modalFooter = findWithType(component, ModalFooter);
        });

        context('when it checks Modal Callback', () => {
            it('checks Modal Callback', () => {
                expect((modal.props.onRequestHide)).to.eql(props.onHideModal);
                expect(modal.props.isOpen).to.be.eql(props.isOpen);
            });
        });

        context('when it checks ModalHeader Callback', () => {
            it('checks ModalHeader Callback', () => {
                expect((modalClose.props.onClick)).to.eql(props.onHideModal);
            });
        });

        context('when it renders ModalHeader', () => {
            it('checks ModalHeader body', () => {
                expect(modalHeader).to.eql(
                    <ModalHeader>
                        <ModalClose onClick={ props.onHideModal } />
                        <ModalTitle>Edit Category</ModalTitle>
                    </ModalHeader>
                );
            });
        });

        context('when it renders ModalBody', () => {
            it('checks ModalBody', () => {
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
        });


        context('when ModalFooter renders', () => {
           const onHideModal = spy();
           const props = {
               onHideModal,
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
               component = renderShallow(<EditCategory { ...props } />, context).output;
               const closeButton = findWithClass(component, 'btn-default');
               return closeButton.props.onClick({ preventDefault: () => {} });
           });

           it('calls the given onHideModal function', () => {
               expect(onHideModal).to.have.been.called();
           });
       });

       context('when ModalFooter renders', () => {
          const onUpdateCategory = spy();
          const props = {
              onHideModal: noop,
              onUpdateCategory,
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
              component = renderShallow(<EditCategory { ...props } />, context).output;
              const updateButton = findWithClass(component, 'btn-primary');
              return updateButton.props.onClick({ preventDefault: () => {} });
          });

          it('calls the given onUpdateCategory function', () => {
              expect(onUpdateCategory).to.have.been.called();
          });
      });
  });
});
