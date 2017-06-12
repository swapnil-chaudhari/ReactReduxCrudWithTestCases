import { combineReducers } from 'redux';
import categories from './category-reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    categories,
});
