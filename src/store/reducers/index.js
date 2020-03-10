import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
import updateDbReducer from './updateDbReducer';
const rootReducer = combineReducers({
    signInReducer,
    currUserReducer,
    userBillValueReducer,
    updateDbReducer
});

export default rootReducer;