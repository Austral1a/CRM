import {GET_RECORDS_SUCCESS, GET_RECORDS_ERROR} from '../actions/constants/action-types';

const initialState = {
    get_records_success: false,
    records: {} 
};

const getCategRecordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECORDS_SUCCESS:
            return Object.assign(state, {}, {
                get_records_success: true,
                records: action.records,
            });
        case GET_RECORDS_ERROR:
            return Object.assign(state, {}, {
                get_records_success: false,
                records: {},
            });
        default:
            return state;
    };
};

export default getCategRecordsReducer;