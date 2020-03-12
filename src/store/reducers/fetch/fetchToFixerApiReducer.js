import {
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_ERROR,
} from '../../actions/constants/action-types';

const initialState = {
    isSuccess: false,
    currencies: {},
    error: ''
}

const fetchToFixerApiReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_CURRENCIES_SUCCESS:
            return Object.assign(state, {}, {
                isSuccess: true,
                currencies: action.currencies,
                error: '',
            });
        case GET_CURRENCIES_ERROR:
            return Object.assign(state, {}, {
                isSuccess: false,
                currencies: {},
                error: action.error
            });
        default:
            return state
    };
};
export default fetchToFixerApiReducer;