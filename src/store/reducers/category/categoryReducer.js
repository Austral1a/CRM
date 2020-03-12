import {
    SET_NEW_CATEGORY_NAME,
    SET_NEW_CATAGORY_LIMIT,
    CHANGE_EXISTS_CATEGORY_LIMIT,
    CHANGE_EXISTS_CATEGORY_CHECKBOX_TRUE,
    CHANGE_EXISTS_CATEGORY_CHECKBOX_FALSE
} from '../../actions/constants/action-types';


const initialStateNewNameCateg = {
    newName: '',
};
export const newNameCategoryReducer = (state = initialStateNewNameCateg, action) => {
    switch (action.type) {
        case SET_NEW_CATEGORY_NAME:
            return Object.assign({}, state, {
                newName: action.newName
            });
        default:
            return state;
    };
};
////////////

const initialStateNewLimitCateg = {
    newLimit: '',
};
export const newLimitCategoryReducer = (state = initialStateNewLimitCateg, action) => {
    switch (action.type) {
        case SET_NEW_CATAGORY_LIMIT:
            return Object.assign({}, state, {
                newLimit: action.newLimit
            });
        default:
            return state;
    };
};
/////////////

const initialStateUpdateCategLimit = {
    changeLimit: '',
};
export const updateLimitCategReducer = (state = initialStateUpdateCategLimit, action) => {
    switch (action.type) {
        case CHANGE_EXISTS_CATEGORY_LIMIT:
            return Object.assign({}, state, {
                changeLimit: action.changeLimit,
            });
        default:
            return state;
    };
};
/////////////
const initialStateSetCheckboxCateg = {
    isChecked: false,
};
export const setCategCheckboxReducer = (state = initialStateSetCheckboxCateg, action) => {
    switch (action.type) {
        case CHANGE_EXISTS_CATEGORY_CHECKBOX_TRUE:
            return Object.assign({}, state, {
                isChecked: true,
            });
        case CHANGE_EXISTS_CATEGORY_CHECKBOX_FALSE:
            return Object.assign({}, state, {
                isChecked: false,
            });
        default:
            return state;
    };
};
