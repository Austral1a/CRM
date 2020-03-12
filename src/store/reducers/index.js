import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
import updateDbReducer from './updateDbReducer';
import getCategoriesReducer from './getCategoriesReducer';
import {
    newNameCategoryReducer,
    newLimitCategoryReducer,
    updateLimitCategReducer,
    setCategCheckboxReducer,
} from '../reducers/category/categoryReducer';
const rootReducer = combineReducers({
    signInReducer,
    currUserReducer,
    userBillValueReducer,
    updateDbReducer,
    getCategoriesReducer,
    newNameCategoryReducer,
    newLimitCategoryReducer,
    updateLimitCategReducer,
    setCategCheckboxReducer,
});

export default rootReducer;