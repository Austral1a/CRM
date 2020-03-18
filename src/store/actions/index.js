import {
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    CURRENT_USER_NOT_ANONYMOUS,
    CURRENT_USER_ANONYMOUS,
    GET_BILL_SUCCESS,
    GET_BILL_ERROR,
    UPDATE_DB_SUCCESS,
    UPDATE_DB_ERROR,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    SET_NEW_CATEGORY_NAME,
    SET_NEW_CATAGORY_LIMIT,
    CHANGE_EXISTS_CATEGORY_LIMIT,
    CHANGE_EXISTS_CATEGORY_CHECKBOX_TRUE,
    CHANGE_EXISTS_CATEGORY_CHECKBOX_FALSE,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_ERROR,
    GET_RECORDS_SUCCESS,
    GET_RECORDS_ERROR,
    RECORDS_SORT_BY_SUM,
    RECORDS_SORT_BY_CATEGORY,
    SET_SORT_RECORDS_BY_SUM_TRUE,
    SET_SORT_RECORDS_BY_SUM_FALSE,
    SET_SORT_RECORDS_BY_CATEG_TRUE,
    SET_SORT_RECORDS_BY_CATEG_FALSE,
    SET_SELECT_SORT_BY_CATEG,
} from './constants/action-types';
import firebase from 'firebase';
// action creator as well, just with async doings, 
//  that means action-creator returns a func rather than action
export const signInUser = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(signInUserSuccess());
            })
            .catch((error) => {
                dispatch(signInUserError(error.message))
            })
    };
};
//action creator 
export const signInUserError = (error) => ({
    type: SIGNIN_ERROR,
    error
});

//action creator
export const signInUserSuccess = () => ({
    type: SIGNIN_SUCCESS,
});


// chech if the user is logged in.
export const currentSignedInUser = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(currentUserNotAnonymous(user));
            } else {
                const user = {
                    email: 'none',
                }
                dispatch(currentUserIsAnonymous(user));
            }
        });
    };
};

export const currentUserNotAnonymous = (user) => ({
    type: CURRENT_USER_NOT_ANONYMOUS,
    user,
});

export const currentUserIsAnonymous = (user) => ({
    type: CURRENT_USER_ANONYMOUS,
    user,
});


// action creator for getting bill value from firebase db
export const getUserBillValue = (user_uid) => {
    return (dispatch) => {
        try {
            firebase.database().ref(`users/${user_uid}/info/bill`).on('value', (snapshot) => {
                let bill = (snapshot.val() || 0)
                dispatch(getUserBillSuccess(bill));
            });
        } catch {
            dispatch(getUserBillError('Невозможно получить счет'))
        };
    };
};

export const getUserBillSuccess = (value) => ({
    type: GET_BILL_SUCCESS,
    user_bill: value,
});
export const getUserBillError = (error) => ({
    type: GET_BILL_ERROR,
    error
});

// action creator to uptade db 
export const updateDb = (updateOptions) => {
    return (dispatch) => {
        try {
            firebase.database().ref().update(updateOptions);
            dispatch(updateDbSuccess());
        } catch {
            dispatch(updateDbError());
        };
    };
};

export const updateDbSuccess = () => ({
    type: UPDATE_DB_SUCCESS,
});
export const updateDbError = () => ({
    type: UPDATE_DB_ERROR,
});

// action craetor for getting data from categories
export const getCategories = (user_uid) => {
    return (dispatch) => {
        try {
            firebase.database().ref(`users/${user_uid}/categories`).on('value', (snapshot) => {
                let categoriesData = (snapshot.val() || {});
                dispatch(getCategoriesSuccess(categoriesData));
            });
        } catch {
            dispatch(getCategoriesError());
        }
    };
};

export const getCategoriesSuccess = (categories) => ({
    type: GET_CATEGORIES_SUCCESS,
    categories
});
export const getCategoriesError = () => ({
    type: GET_CATEGORIES_ERROR,
});

////////////////////
// for category page
export const setNewCategoryName = (name) => ({
    type: SET_NEW_CATEGORY_NAME,
    newName: name,
});
export const setNewCategoryLimit = (limit) => ({
    type: SET_NEW_CATAGORY_LIMIT,
    newLimit: limit,
});
export const updateExistsCategoryLimit = (limit) => ({
    type: CHANGE_EXISTS_CATEGORY_LIMIT,
    changeLimit: limit,
});

export const setCategoryCheckBoxTrue = () => ({
    type: CHANGE_EXISTS_CATEGORY_CHECKBOX_TRUE,
});
export const setCategoryCheckboxFalse = () => ({
    type: CHANGE_EXISTS_CATEGORY_CHECKBOX_FALSE,
});

///////////////////
//  fetch to fixer api

export const fetchFixer = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API}&symbols=USD,PLN,EUR,RUB,UAH`);
            const data = await res.json();
            dispatch(fetchFixerSuccess(data.rates));
        } catch {
            dispatch(fetchFixerError('Невозможно получить данные'));
        };
    };
};


export const fetchFixerSuccess = (currencies) => ({
    type: GET_CURRENCIES_SUCCESS,
    currencies,
});
export const fetchFixerError = (error) => ({
    type: GET_CURRENCIES_ERROR,
    error,
});

//////////
////////////////////
// get records

export const getCategRecords = (user_uid) => {
    return (dispatch)  => {
        try { 
            firebase.database().ref(`users/${user_uid}/categories/records`).on('value', (snapshot) => {
                let recordsData = (snapshot.val() || {});
                dispatch(getCategRecordsSuccess(recordsData));
            });
        } catch {
            dispatch(getCategRecordsError());
        };
    };
};

export const getCategRecordsSuccess = (records) => ({
    type: GET_RECORDS_SUCCESS,
    records,
});
export const getCategRecordsError = () => ({
    type: GET_RECORDS_ERROR 
});

// actions for sorting records by some param
export const sortRecordsBySum = () => ({
    type: RECORDS_SORT_BY_SUM,
});

export const sortRecordsByCateg = (categ_name) => ({
    type: RECORDS_SORT_BY_CATEGORY,
    categ_name
});
//////////////////
// sorting checkboxes state 
export const setCheckboxSortBySumTrue = () => ({
    type: SET_SORT_RECORDS_BY_SUM_TRUE,
});

export const setCheckboxSortBySumFalse = () => ({
    type: SET_SORT_RECORDS_BY_SUM_FALSE,
});

export const setCheckboxSortByCategTrue = () => ({
    type: SET_SORT_RECORDS_BY_CATEG_TRUE
});

export const setCheckboxSortByCategFalse = () => ({
    type: SET_SORT_RECORDS_BY_CATEG_FALSE
});

export const setSelectSortByCateg = (value) => ({
    type: SET_SELECT_SORT_BY_CATEG,
    value
});