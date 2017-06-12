import React, { Component, PropTypes } from 'react';
import fetchCategories, {
    editCategory,
    updateCategory,
    deleteCategory,
    saveCategory
} from 'src/actions/category-actions';
import hideAlert, {
    openModal,
    hideModal,
} from 'src/actions/common-actions';
import { connect } from 'react-redux';
import Categories from './categories';
import AddCategory from './add-category';
import EditCategory from './edit-category';
import { Alert, Pagination } from 'react-bootstrap';

class Content extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        categories: PropTypes.array,
        page: PropTypes.number,
        message: PropTypes.object,
        isAlertVisible: PropTypes.bool,
        modalAction: PropTypes.string,
        errorClass: PropTypes.string,
        isOpen: PropTypes.bool,
        editCategory: PropTypes.object,
    };

    componentWillMount() {
        this.props.dispatch(fetchCategories());
    }

    handleSaveCategory = (category) => {
        this.props.dispatch(saveCategory(category));
    }

    handleOpenModal = () => {
        this.props.dispatch(openModal());
    }

    handleHideModal = () => {
        this.props.dispatch(hideModal());
    }

    handleDeleteCategory = (id) => {
        this.props.dispatch(deleteCategory(id));
    }

    handleEditCategory = (id) => {
        this.props.dispatch(editCategory(id));
    }

    handleUpdateCategory = (category, id) => {
        this.props.dispatch(updateCategory(category, id));
    }

    handleHideAlert = () => {
        this.props.dispatch(hideAlert());
    }

    handleChangePage = (page) => {
        // this.props.dispatch(push('/posts?page=' + page));
        window.location.href = `/categories?page=${page}`;
    }

    render() {
        // pagination
        const { categories, page } = this.props;
        const perPage = 5;
        const pages = Math.ceil(categories.length / perPage);
        const startOffset = (page - 1) * perPage;
        let startCount = 0;

        return (
            <div id="page-wrapper" className="page-flower">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Categories <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Categories
                                </li>
                            </ol>
                            <div className="row">
                                { this.props.message.success !== '' &&
                                    this.props.isAlertVisible === true ?
                                    <Alert
                                        bsStyle="success"
                                        onDismiss={ this.handleHideAlert }
                                    >
                                        <strong>{ this.props.message.success }</strong>
                                    </Alert>
                                    : null
                                }

                                <button
                                    type="button"
                                    onClick={ this.handleOpenModal }
                                    className="btn btn-primary add-category-btn"
                                >
                                    ADD CATEGORY
                                </button>

                                { this.props.modalAction === 'ADD' ?
                                    <AddCategory
                                        message={ this.props.message }
                                        errorClass={ this.props.errorClass }
                                        isOpen={ this.props.isOpen }
                                        onSaveCategory={ this.handleSaveCategory }
                                        onHideModal={ this.handleHideModal }
                                    /> : null
                                }

                                { this.props.modalAction === 'EDIT' ?
                                    <EditCategory
                                        message={ this.props.message }
                                        errorClass={ this.props.errorClass }
                                        isOpen={ this.props.isOpen }
                                        onUpdateCategory={ this.handleUpdateCategory }
                                        onHideModal={ this.handleHideModal }
                                        category={ this.props.editCategory }
                                    /> : null
                                }

                                <Categories
                                    categories={ categories }
                                    onDelete={ this.handleDeleteCategory }
                                    onEdit={ this.handleEditCategory }
                                    startOffset={ startOffset }
                                    startCount={ startCount }
                                    perPage={ perPage }
                                />
                                <Pagination
                                    className="users-pagination pull-right"
                                    bsSize="medium"
                                    maxButtons={ 10 }
                                    first last next prev boundaryLinks
                                    items={ pages }
                                    activePage={ page }
                                    onSelect={ this.handleChangePage }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => ({
    categories: store.categories.categories,
    editCategory: store.categories.editCategory,
    modalAction: store.categories.modalAction,
    isOpen: store.categories.isOpen,
    message: store.categories.message,
    errorClass: store.categories.errorClass,
    isAlertVisible: store.categories.isAlertVisible,
    sortType: store.categories.sortType,
    page: Number(store.routing.locationBeforeTransitions.query.page) || 1,
});

export default connect(mapStateToProps)(Content);
