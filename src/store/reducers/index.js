import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
import updateDbReducer from './updateDbReducer';
import getCategoriesReducer from './getCategoriesReducer';
import getCategRecordsReducer from './getCategRecordsReducer';
import fetchToFixerApiReducer from './fetch/fetchToFixerApiReducer';
import {
    setRecordsSortCheckboxReducer,
    setRecordsSelectForSortByCateg} from './records/setSortCheckboxesReducer';
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
    fetchToFixerApiReducer,
    getCategRecordsReducer,
    setRecordsSortCheckboxReducer,
    setRecordsSelectForSortByCateg,
});

export default rootReducer;