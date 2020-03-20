import { GET_VISITED_PAGES_SUCCESS, GET_VISITED_PAGES_ERROR } from '../actions/constants/action-types';

const initialState = {
    getVisitedPagesSuccess: false,
    you_page: false,
    bill_page: false,
    category_page: false,
    history_page: false,
    records_page: false,
    survey_page: false,
};

const getVisitedPagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VISITED_PAGES_SUCCESS:
            return Object.assign({}, state, {
                getVisitedPagesSuccess: true,
                you_page: action.you_page,
                bill_page: action.bill_page,
                category_page: action.category_page,
                history_page: action.history_page,
                records_page: action.records_page,
                survey_page: action.survey_page,
            });
        case GET_VISITED_PAGES_ERROR:
            return Object.assign({}, state, {
                ...state,
                getVisitedPagesSuccess: false,
            });
        default:
            return state;
    };
};
export default getVisitedPagesReducer;