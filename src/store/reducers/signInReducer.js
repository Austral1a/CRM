import { SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNIN_START } from '../actions/constants/action-types';

const initialState = {
    error: '',
};

// reducer which is connected with sign_in action-creator
const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                error: '',
            });
        case SIGNIN_ERROR:
            return Object.assign({}, state, {
                ...state,
                error: action.error,
            });
        default:
            return state;
    };
};

export default signInReducer;