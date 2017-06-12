import {
    FETCH_CATEGORIES_STARTED,
    FETCH_CATEGORIES_COMPLETED,
    FETCH_CATEGORIES_ERROR,
    SAVE_CATEGORY_STARTED,
    SAVE_CATEGORY_COMPLETED,
    SAVE_CATEGORY_ERROR,
    EDIT_CATEGORY_STARTED,
    UPDATE_CATEGORY_STARTED,
    UPDATE_CATEGORY_COMPLETED,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_STARTED,
    DELETE_CATEGORY_COMPLETED,
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';

export default function reducer(state = {
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
}, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_STARTED: {
            return { ...state };
        }
        case FETCH_CATEGORIES_ERROR: {
            return { ...state, message: { success: '', fail: action.payload.results } };
        }
        case FETCH_CATEGORIES_COMPLETED: {
            let success = state.message.success;
            if (!state.isCRUD)
                success = '';

            return { ...state, isCRUD: false, message: { success },
                    categories: action.payload };
        }
        case DELETE_CATEGORY_STARTED: {
            return { ...state, deleteing: true };
        }
        case DELETE_CATEGORY_COMPLETED: {
            return { ...state, isCRUD: true, isAlertVisible: true,
                    message: { success: action.payload.results, fail: '' } };
        }
        case OPEN_MODAL: {
            return { ...state, message: { success: '', fail: '' }, errorClass: '', isOpen: true,
                     modalAction: 'ADD' };
        }
        case HIDE_MODAL: {
            return { ...state, isOpen: false, modalAction: '' };
        }
        case HIDE_ALERT: {
            return { ...state, isAlertVisible: false };
        }
        case SAVE_CATEGORY_STARTED: {
            return { ...state };
        }
        case SAVE_CATEGORY_COMPLETED: {
            return { ...state, isOpen: false, modalAction: '', isCRUD: true, isAlertVisible: true,
                    message: { success: action.payload.results, fail: '' } };
        }
        case SAVE_CATEGORY_ERROR: {
            return { ...state, errorClass: 'alert alert-danger',
                    message: { success: '', fail: action.payload } };
        }
        case EDIT_CATEGORY_STARTED: {
            const index = state.categories.findIndex(x => x.id === action.payload);
            const editCategory = state.categories[index];
            return { ...state, isOpen: true, modalAction: 'EDIT', editCategory,
                    message: { success: '', fail: '' }, errorClass: '' };
        }
        case UPDATE_CATEGORY_STARTED: {
            return { ...state };
        }
        case UPDATE_CATEGORY_COMPLETED: {
            return { ...state, isOpen: false, modalAction: '', isCRUD: true, isAlertVisible: true,
                    message: { success: action.payload.results, fail: '' } };
        }
        case UPDATE_CATEGORY_ERROR: {
            return { ...state, errorClass: 'alert alert-danger',
                    message: { success: '', fail: action.payload } };
        }
        default : {
            return state;
        }
    }

}
