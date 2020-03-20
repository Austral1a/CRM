import { CREATE_VISITED_PAGES_SUCCESS, CREATE_VISITED_PAGES_ERROR } from '../actions/constants/action-types';

const initialState = {
    isVisitedPagesCreated: false,
}

const createVisitedPagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_VISITED_PAGES_SUCCESS:
            return Object.assign({}, state, {
                isVisitedPagesCreated: true,
            });
        case CREATE_VISITED_PAGES_ERROR:
            return Object.assign({}, state, {
                isVisitedPagesCreated: false,
            });
        default:
            return state;
    };
};
export default createVisitedPagesReducer;