import { expect } from 'chai';
import {
    FETCH_CATEGORIES_COMPLETED,
    FETCH_CATEGORIES_ERROR,
    SAVE_CATEGORY_COMPLETED,
    SAVE_CATEGORY_ERROR,
    EDIT_CATEGORY_STARTED,
    UPDATE_CATEGORY_COMPLETED,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_COMPLETED,
    DELETE_CATEGORY_ERROR,
} from 'src/action-types';
import fetchCategories, { saveCategory, editCategory, updateCategory, deleteCategory } from 'src/actions/category-actions';
import sinon, { spy, stub } from 'sinon';
import axios from 'axios';

describe('categories action creators', () => {
    const categoryApi = 'http://react.schaudhari.mr.devorch.com/category.php';
    describe('fetch categories', () => {
        const categories = [
            {
                id: '1', name: "test category", description: "this is test category." ,
            },
            {
                id: '2', name: "test category", description: "this is test category."
            }
        ];
        context('when fetchCategories is called', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'get').returns(
                    Promise.resolve(
                        { response: categories }
                    )
                );

                return fetchCategories()(dispatch);
            });

            after(() => {
                axios.get.restore();
            });

            it('makes a GET with the correct URL and headers', () => {
               expect(axios.get).to.have.been.calledOnce.calledWith(categoryApi);
            });
        });

        context('when it resolves successfully', () => {
            const dispatch = spy();
            const response = {
                data: categories
            };

            before(() => {
                stub(axios, 'get').returns(Promise.resolve(response));

                return fetchCategories()(dispatch);
            });

            after(() => {
                axios.get.restore();
            });

            it(`dispatches ${FETCH_CATEGORIES_COMPLETED} with the categories from response`, () => {
                expect(dispatch).to.have.been.calledOnce.calledWith({
                    type: FETCH_CATEGORIES_COMPLETED,
                    payload: response.data
                });
            });
        });
    });

    describe('save category', () => {
        const category = {
                name: "test category", description: "this is test category."
            };
        const response = {
            data: {
                results: 'Category is added successfully.'
            }
        };

        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        context('when saveCategory is called', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'post').returns(
                    Promise.resolve(response)
                );

                return saveCategory(category)(dispatch);
            });

            after(() => {
                axios.post.restore();
            });

            it('makes a POST with the correct URL and headers', () => {
                expect(axios.post).to.have.been.calledOnce.calledWith(categoryApi, category, headers);
            });
        });

        context('when it resolves successfully', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'post').returns(Promise.resolve(response));

                return saveCategory(category)(dispatch);
            });

            after(() => {
                axios.post.restore();
            });

            it(`dispatches ${SAVE_CATEGORY_COMPLETED} with successful message from response`, () => {
                expect(dispatch).to.have.been.calledTwice.calledWith({
                    type: SAVE_CATEGORY_COMPLETED,
                    payload: response.data.results
                });
            });
        });

        context('when it resolves errors', () => {
            const dispatch = spy();
            const response = {
                data: {
                    error: {
                        title: 'Title is required field.',
                        description: 'Description is required field.'
                    }
                }
            };
            before(() => {
                stub(axios, 'post').returns(Promise.resolve(response));

                return saveCategory(category)(dispatch);
            });

            after(() => {
                axios.post.restore();
            });

            it(`dispatches ${SAVE_CATEGORY_ERROR} with error message from response`, () => {
                expect(dispatch).to.have.been.calledOnce.calledWith({
                    type: SAVE_CATEGORY_ERROR,
                    payload: response.data.error
                });
            });
        });
    });

    describe('edit category', () => {
        const id = 1;

        context('when editCategory is called', () => {
            const dispatch = spy();

            before((done) => {
                editCategory(id)(dispatch);
                done();
            });

            it(`dispatches ${EDIT_CATEGORY_STARTED} with id`, () => {
                expect(dispatch).to.have.been.calledOnce.calledWith({
                    type: EDIT_CATEGORY_STARTED,
                    payload: id
                });
            });
        });
    });

    describe('update category', () => {
        const category = {
            name: "test category", description: "this is test category."
        };
        const id= 1;
        const response = {
            data: {
                results: 'Category is updated successfully.'
            }
        };

        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        context('when updateCategory is called', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'put').returns(
                    Promise.resolve(response)
                );

                return updateCategory(category, id)(dispatch);
            });

            after(() => {
                axios.put.restore();
            });

            it('makes a PUT with the correct URL and headers', () => {
                expect(axios.put).to.have.been.calledOnce.calledWith(`${categoryApi}?id=${id}`, category, headers);
            });
        });

        context('when it resolves successfully', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'put').returns(Promise.resolve(response));

                return updateCategory(category, id)(dispatch);
            });

            after(() => {
                axios.put.restore();
            });

            it(`dispatches ${UPDATE_CATEGORY_COMPLETED} with successful message from response`, () => {
                expect(dispatch).to.have.been.calledTwice.calledWith({
                    type: UPDATE_CATEGORY_COMPLETED,
                    payload: response.data.results
                });
            });
        });

        context('when it resolves errors', () => {
            const dispatch = spy();
            const response = {
                data: {
                    error: {
                        title: 'Title is required field.',
                        description: 'Description is required field.'
                    }
                }
            };
            before(() => {
                stub(axios, 'put').returns(Promise.resolve(response));

                return updateCategory(category)(dispatch);
            });

            after(() => {
                axios.put.restore();
            });

            it(`dispatches ${UPDATE_CATEGORY_ERROR} with error message from response`, () => {
                expect(dispatch).to.have.been.calledOnce.calledWith({
                    type: UPDATE_CATEGORY_ERROR,
                    payload: response.data.error
                });
            });
        });
    });

    describe('delete category', () => {
        const id= 1;
        const response = {
            data: {
                results: 'Category is deleted successfully.'
            }
        };

        context('when deleteCategory is called', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'delete').returns(
                    Promise.resolve(response)
                );

                return deleteCategory(id)(dispatch);
            });

            after(() => {
                axios.delete.restore();
            });

            it('makes a DELETE with the correct URL', () => {
                expect(axios.delete).to.have.been.calledOnce.calledWith(`${categoryApi}?id=${id}`);
            });
        });

        context('when it resolves successfully', () => {
            const dispatch = spy();
            before(() => {
                stub(axios, 'delete').returns(Promise.resolve(response));

                return deleteCategory(id)(dispatch);
            });

            after(() => {
                axios.delete.restore();
            });

            it(`dispatches ${DELETE_CATEGORY_COMPLETED} with successful message from response`, () => {
                expect(dispatch).to.have.been.calledTwice.calledWith({
                    type: DELETE_CATEGORY_COMPLETED,
                    payload: response.data.results
                });
            });
        });
    });
});
