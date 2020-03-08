import { CURRENT_USER_NOT_ANONYMOUS, CURRENT_USER_ANONYMOUS } from '../actions/constants/action-types';

const initialState = {
    user: '',
    bool: false,
    userUid: ''
};

const currUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_NOT_ANONYMOUS:
            return Object.assign({}, state, {
                user: action.user,
                bool: true,
                userUid: action.user.uid
            });
        case CURRENT_USER_ANONYMOUS:
            return Object.assign({}, state, {
                user: '',
                bool: false,
                userUid: ''
            });
        default:
            return state;
    };
};

export default currUserReducer;