import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
import updateDbReducer from './updateDbReducer';
import getCategoriesReducer from './getCategoriesReducer';
const rootReducer = combineReducers({
    signInReducer,
    currUserReducer,
    userBillValueReducer,
    updateDbReducer,
    getCategoriesReducer
});

export default rootReducer;