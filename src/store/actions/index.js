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

export const setCategoryCheckBoxTrue = (isChecked) => ({
    type: CHANGE_EXISTS_CATEGORY_CHECKBOX_TRUE,
    isChecked,
});
export const setCategoryCheckboxFalse = (isChecked) => ({
    type: CHANGE_EXISTS_CATEGORY_CHECKBOX_FALSE,
    isChecked,
});