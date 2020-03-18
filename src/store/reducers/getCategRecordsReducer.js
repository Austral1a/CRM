import {
    GET_RECORDS_SUCCESS, 
    GET_RECORDS_ERROR, 
    RECORDS_SORT_BY_SUM, 
    RECORDS_SORT_BY_CATEGORY} from '../actions/constants/action-types';

const initialState = {
    get_records_success: false,
    records: {} 
};

const getCategRecordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECORDS_SUCCESS:
            return Object.assign({}, state, {
                get_records_success: true,
                records: action.records,
            });
        case GET_RECORDS_ERROR:
            return Object.assign({}, state, {
                get_records_success: false,
                records: {},
            });
        case RECORDS_SORT_BY_SUM:
            return Object.assign({}, state, {
                get_records_success: true,
                records: Object.values(state.records).sort((a, b) => (a.income ? a.income : a.consumption) - (b.consumption ? b.consumption : b.income))
            });
        case RECORDS_SORT_BY_CATEGORY:
            return Object.assign({}, state, {
                get_records_success: true,
                records: Object.values(state.records).filter((record) => action.categ_name.toLowerCase() === (record.category).toLowerCase())
            }); 
        default:
            return state;
    };
};

export default getCategRecordsReducer;