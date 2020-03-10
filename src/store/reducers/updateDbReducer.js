import { UPDATE_DB_SUCCESS, UPDATE_DB_ERROR } from '../actions/constants/action-types';

const initialState = {
    update_db_success: false,
}

const updateDbReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DB_SUCCESS:
            return Object.assign(state, {}, {
                update_db_success: true,
            });
        case UPDATE_DB_ERROR:
            return Object.assign(state, {}, {
                update_db_success: false,
            });
        default:
            return state;
    };
};

export default updateDbReducer;