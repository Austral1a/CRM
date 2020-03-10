import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from '../actions/constants/action-types';

const initialState = {
    getCategoriesSuccess: false,
    categories: {},
}

const getCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                getCategoriesSuccess: true,
                categories: action.categories
            });
        case GET_CATEGORIES_ERROR:
            return Object.assign(state, {}, {
                getCategoriesSuccess: false,
                categories: {},
            });
        default:
            return state
    };
};

export default getCategoriesReducer;