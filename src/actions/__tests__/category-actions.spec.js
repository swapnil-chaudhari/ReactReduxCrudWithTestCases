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
import fetchCategories, { saveCategory, editCategory } from 'src/actions/category-actions';
import sinon, { spy, stub } from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

describe('category actions', () => {
    describe('fetchCategory', () => {
        context('when fetchCategory is called', () => {
            it.only('fetches categories', () =>  {
                let get = stub(axios, 'get');
                get.yields();
                let dispatch = spy();
                fetchCategories(dispatch);
                expect(dispatch).to.have.been.calledOnce;
                expect(axios.get).to.be.calledOnce;
                get.restore();
            });
        });
    });

    describe('saveCategory', () => {
        context('when saveCategory is called', () => {
            it('saves category', () =>  {
                let message = { success: 'Category is added succesfully.' };
                let post = stub(axios, 'post');
                post.yields();
                let dispatch = spy();
                const category = {
                    name: "test category", description: "this is test category." 
                };
                saveCategory(category, dispatch);
                expect(dispatch).to.have.been.calledOnce;
                expect(axios.post).to.be.calledOnce;
                // expect(dispatch).to.have.been.calledWith({
                //     type: SAVE_CATEGORY_COMPLETED, payload: message
                // });
                post.restore();
            });
        });
    });

    describe('editCategory', () => {
        context('when editCategory is called', () => {
            let id = 1;
            const dispatch = spy();
            before((done) => {
                editCategory(id)(dispatch);
                done();
            });
            
            it('dispatches editCategory', () => {
                expect(dispatch).to.have.been.calledWith({
                    type: EDIT_CATEGORY_STARTED, payload: id
                });
            });
        });
    });
});