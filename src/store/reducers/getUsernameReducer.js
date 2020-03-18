import {GET_USERNAME_SUCCESS, GET_USERNAME_ERROR} from '../actions/constants/action-types';

const initialState = {
    username: '',
    error: '',
}

const getUsernameReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERNAME_SUCCESS:
            return Object.assign({}, state, {
                username: action.username,
            });
        case GET_USERNAME_ERROR:
            return Object.assign({}, state, {
                error: action.error,
            });
        default:
            return state;
    };
};

export default getUsernameReducer;