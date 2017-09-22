import React, { Component, PropTypes } from 'react';
import {
        Modal,
        ModalHeader,
        ModalTitle,
        ModalClose,
        ModalBody,
        ModalFooter
    } from 'react-modal-bootstrap';
import noop from 'src/utils/noop';

class EditCategory extends Component {
    static propTypes = {
        onHideModal: PropTypes.func,
        onUpdateCategory: PropTypes.func,
        isOpen: PropTypes.bool,
        category: PropTypes.object,
        message: PropTypes.object,
        errorClass: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.category.name,
            description: this.props.category.description,
        };
    }

    handleFormInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleHideModal = () => {
        this.props.onHideModal(this.props.isOpen);
    }

    handleUpdateCategory = () => {
        const editedCategory = {
            title: this.state.title,
            description: this.state.description,
        };
        this.props.onUpdateCategory(editedCategory, this.props.category.id);
    }

    render() {
        let errors = '';
        if (typeof this.props.message.fail !== 'undefined')
            errors = Object.keys(this.props.message.fail).map((k, idx) =>
                <li key={ idx }>{ this.props.message.fail[k] }</li>
            );

        return (
            <div className="container App">
                <Modal isOpen={ this.props.isOpen } onRequestHide={ this.props.onHideModal }>
                    <ModalHeader>
                        <ModalClose onClick={ this.props.onHideModal } />
                        <ModalTitle>Edit Category</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className={ this.props.errorClass }>
                            { errors }
                        </div>
                        <form role="form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    name = "title"
                                    onChange = { this.handleFormInput }
                                    defaultValue = { this.props.category.name }
                                    className = "form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name = "description"
                                    onChange = { this.handleFormInput }
                                    defaultValue={ this.props.category.description }
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
                            onClick={ this.handleUpdateCategory }
                            className="btn btn-primary"
                            value="Update"
                        />
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditCategory;
