import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
import userBillValueReducer from './currentUserBillValueReducer';
const rootReducer = combineReducers({
    signInReducer,
    currUserReducer,
    userBillValueReducer

});

export default rootReducer;