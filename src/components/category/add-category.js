import React, { Component, PropTypes } from 'react';
import {
        Modal,
        ModalHeader,
        ModalTitle,
        ModalClose,
        ModalBody,
        ModalFooter
    } from 'react-modal-bootstrap';


class AddCategory extends Component {
    static propTypes = {
        onHideModal: PropTypes.func,
        onSaveCategory: PropTypes.func,
        errorClass: PropTypes.string,
        isOpen: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            newCategory: {},
        };
    }

    handleHideModal = () => {
        this.props.onHideModal(this.props.isOpen);
    };

    handleSaveCategory = () => {
        this.setState({ newCategory: {
            title: this.refs.title.value,
            description: this.refs.description.value,
        } }, () => {
            this.props.onSaveCategory(this.state.newCategory);
        });
    };

    render() {
        return (
            <Modal isOpen={ this.props.isOpen } onRequestHide={ this.handleHideModal }>
                <ModalHeader>
                    <ModalClose onClick={ this.handleHideModal } />
                    <ModalTitle>Add Category</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form role="form">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                ref="title"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                ref="description"
                                className="form-control"
                                rows="3"
                            >
                            </textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-default" onClick={ this.handleHideModal }>
                        Close
                    </button>
                    <input
                        type="button"
                        onClick={ this.handleSaveCategory }
                        className="btn btn-primary"
                        value="Save"
                    />
                </ModalFooter>
            </Modal>
        );
    }
}

export default AddCategory;
