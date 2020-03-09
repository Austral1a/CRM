import { GET_BILL_SUCCESS, GET_BILL_ERROR } from '../actions/constants/action-types';

const initialState = {
    user_bill: 0,
    error: ''
}

const userBillValueReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BILL_SUCCESS:
            return Object.assign({}, state, {
                user_bill: action.user_bill,
                error: '',
            });
        case GET_BILL_ERROR:
            return Object.assign({}, state, {
                user_bill: 0,
                error: action.error
            });
        default:
            return state;
    };
};
export default userBillValueReducer;