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
import fetchCategories from 'src/actions/category-actions';
import sinon, { spy, stub } from 'sinon';
import axios from 'axios';

describe('category actions', () => {
    describe('fetchCategories', () => {
        context('when it is called', () => {
            const dispatch = spy();
            const category = {
                id: '1',
                name: 'title',
                description: 'description',
            }
            before((done) => {
                fetchCategories()(dispatch);
                done();
            });
            it(`dispatches ${FETCH_CATEGORIES_COMPLETED} and fetches categories`, () => {
                axios.get('http://react.schaudhari.mr.devorch.com/category.php')
                .then((res) => {
                    expect(dispatch).to.have.been.calledWith({
                        type: FETCH_CATEGORIES_COMPLETED,
                        category
                    });
                })
                .catch((err) => {
                    expect(dispatch).to.have.been.calledWith({
                        type: FETCH_CATEGORIES_ERROR,
                        category
                    });
                });
                    
            });
        });
    });
});
