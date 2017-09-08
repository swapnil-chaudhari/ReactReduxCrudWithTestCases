import axios from 'axios';
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

export const categoryApi = 'http://react.schaudhari.mr.devorch.com/category.php';

const fetchCategories = () =>
    dispatch =>
        axios.get(`${categoryApi}`)
        .then((response) => {
            dispatch({ type: FETCH_CATEGORIES_COMPLETED, payload: response.data });
        })
        .catch((err) => {
            console.log('Error:' + err);
            dispatch({ type: FETCH_CATEGORIES_ERROR, payload: err.results });
        });

export default fetchCategories;

export const headers = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const saveCategory = (category) =>
    dispatch =>
        axios.post(categoryApi, category, headers)
        .then((response) => {
            if (response.data.results) {
            	dispatch({ type: SAVE_CATEGORY_COMPLETED, payload: response.data.results });
                dispatch(fetchCategories());
           }
            else {
                dispatch({ type: SAVE_CATEGORY_ERROR, payload: response.data.error });
            }
        });

export const editCategory = (id) =>
    dispatch =>
        dispatch({ type: EDIT_CATEGORY_STARTED, payload: id });

export const updateCategory = (category, id) =>
    dispatch =>
        axios.put(`${categoryApi}?id=${id}`, category, headers)
        .then((response) => {
            if (response.data.results){
                dispatch({ type: UPDATE_CATEGORY_COMPLETED, payload: response.data.results });
                dispatch(fetchCategories());
            }
            else {
                dispatch({ type: UPDATE_CATEGORY_ERROR, payload: response.data.error });
            }
        });

export const deleteCategory = (id) =>
    dispatch =>
        axios.delete(`${categoryApi}?id=${id}`)
        .then((response) => {
            dispatch({ type: DELETE_CATEGORY_COMPLETED, payload: response.data.results });
            dispatch(fetchCategories());
        })
        .catch((err) => {
            dispatch({ type: DELETE_CATEGORY_ERROR, payload: err });
        });
