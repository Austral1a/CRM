import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
import updateDbReducer from './updateDbReducer';
import getCategoriesReducer from './getCategoriesReducer';
//
import fetchToFixerApiReducer from './fetch/fetchToFixerApiReducer';
//
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
    fetchToFixerApiReducer
});

export default rootReducer;