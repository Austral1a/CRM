import { CURRENT_USER_NOT_ANONYMOUS, CURRENT_USER_ANONYMOUS } from '../actions/constants/action-types';

const initialState = {
    user: '',
    bool: false
};

const currUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_NOT_ANONYMOUS:
            return Object.assign({}, state, {
                user: action.user,
                bool: true
            });
        case CURRENT_USER_ANONYMOUS:
            return Object.assign({}, state, {
                user: '',
                bool: false
            });
        default:
            return state;
    };
};

export default currUserReducer;