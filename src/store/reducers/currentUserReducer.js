import { CURRENT_USER_NOT_ANONYMOUS, CURRENT_USER_ANONYMOUS } from '../actions/constants/action-types';

const initialState = {
    user: '',
    isUserLoggedIn: false,
    isUserAnonymous: false,
    userUid: ''
};

const currUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_NOT_ANONYMOUS:
            return Object.assign({}, state, {
                user: action.user,
                isUserLoggedIn: true,
                userUid: action.user.uid,
                isUserAnonymous: false,
            });
        case CURRENT_USER_ANONYMOUS:
            return Object.assign({}, state, {
                user: '',
                isUserLoggedIn: false,
                userUid: '',
                isUserAnonymous: true,
            });
        default:
            return state;
    };
};

export default currUserReducer;