import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import currUserReducer from './currentUserReducer';
const rootReducer = combineReducers({
    signInReducer,
    currUserReducer
});

export default rootReducer;