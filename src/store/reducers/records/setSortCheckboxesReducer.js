import {
    SET_SORT_RECORDS_BY_SUM_TRUE, 
    SET_SORT_RECORDS_BY_SUM_FALSE,
    SET_SORT_RECORDS_BY_CATEG_TRUE,
    SET_SORT_RECORDS_BY_CATEG_FALSE,
    SET_SELECT_SORT_BY_CATEG
} from '../../actions/constants/action-types';

const initialStateSetCheckboxesRecordsSort = {
    isBySumChecked: false,
    isByCategChecked: false,
}

export const setRecordsSortCheckboxReducer = (state = initialStateSetCheckboxesRecordsSort, action) => {
    switch(action.type) {
        case SET_SORT_RECORDS_BY_SUM_TRUE:
            return Object.assign({}, state, {
                isBySumChecked: true,
                isByCategChecked: false,
            });
        case SET_SORT_RECORDS_BY_SUM_FALSE:
            return Object.assign({}, state, {
                isBySumChecked: false,
            });
        case SET_SORT_RECORDS_BY_CATEG_TRUE:
            return Object.assign({}, state, {
                isByCategChecked: true,
                isBySumChecked: false,
            });
        case SET_SORT_RECORDS_BY_CATEG_FALSE:
            return Object.assign({}, state, {
                isByCategChecked: false,
            });
        default:
            return state
    };
};

const initialStateSetSelectForSortByCateg = {
    value: undefined
};

export const setRecordsSelectForSortByCateg = (state = initialStateSetSelectForSortByCateg, action) => {
    switch(action.type) {
      case SET_SELECT_SORT_BY_CATEG:
          return Object.assign({}, state, {
            value: action.value
          });
        default:
            return state;
    };
};