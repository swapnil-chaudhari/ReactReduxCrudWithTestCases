import { expect } from 'chai';
import * as ActionType from 'src/action-types';
import reducer from '../category-reducer';
import Store from 'src/store';



describe('Reducer', () => {
    const state = {
            categories: [],
            addCategory: [],
            message: {
                success: '',
                fail: '',
            },
            errorClass: '',
            isOpen: false,
            isCRUD: false,
            isAlertVisible: false,
            modalAction: '',
    }
    context('Reducer::reducer', () => {
        // setup
        let action = { type: 'unknown' };
        // execute
        let newState = reducer(undefined, { type: 'unknown' });
        it('returns an empty array as default state', () => {
            // verify
            expect(newState).to.eql(state);
        });
    });

    context('Reducer::FETCH_CATEGORIES_COMPLETED', () => {
        // setup
        let action = {
            type: ActionType.FETCH_CATEGORIES_COMPLETED,
            response: state
        };
        // execute
        let newState = reducer(state, action);
        let resultState = { ...state, isCRUD: false, 
                            message: { success: "This data is successfully saved" },
                            categories: {
                                title: "Application",
                                description: "Good"
                            }
                        };
        it('returns the <code>FETCH_CATEGORIES_COMPLETED</code> in given action', () => {
            // verify
            expect(resultState).to.equal(newState);
        });
    });
});