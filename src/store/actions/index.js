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
    GET_USERNAME_SUCCESS,
    GET_USERNAME_ERROR,
    FIRST_VISIT_YOU_PAGE,
    FIRST_VISIT_HISTORY_PAGE,
    FIRST_VISIT_BILL_PAGE,
    FIRST_VISIT_CATEGORY_PAGE,
    FIRST_VISIT_RECORDS_PAGE,
    FIRST_VISIT_SURVEY_PAGE,
    GET_VISITED_PAGES_SUCCESS,
    GET_VISITED_PAGES_ERROR,
    CREATE_VISITED_PAGES_SUCCESS,
    CREATE_VISITED_PAGES_ERROR

} from './constants/action-types';
import firebase from 'firebase';
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
                delete categoriesData.records;
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
// get user username

export const getUsername = (user_uid) => {
    return (dispatch) => {
        try {
            firebase.database().ref(`users/${user_uid}/info/username`).on('value', (snapshot) => {
                let username = (snapshot.val());
                dispatch(getUsernameSuccess(username));
            });
        } catch {
            dispatch(getUsernameError('Невозможно получить ваше username'));
        }
    };
};

export const getUsernameSuccess = (username) => ({
    type: GET_USERNAME_SUCCESS,
    username,
});

export const getUsernameError = (error) => ({
    type: GET_USERNAME_ERROR,
    error,
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
            let data = await res.json();
            data = data.rates;
            dispatch(fetchFixerSuccess(data));
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

//////////////
// set visited page(for modal)
// Вызвать эту функц при успешной регистрации
export const createVisitedPages = (user_uid) => {
    return (dispatch)  => {
        try { 
            firebase.database().ref(`users/${user_uid}/info/isVisitedPages/`).set({
                you_page: false,
                history_page: false,
                bill_page: false,
                category_page: false,
                records_page: false,
                survey_page: false
            });
            dispatch(visitedPagesCreatedSuccess());
        } catch {
            dispatch(visitedPagesCreatedError());
        };
    };
};

//TODO: Получить состояние просмотреных страниц
export const getVisitedPages = (user_uid) => {
    return (dispatch) => {
        try {
            firebase.database().ref(`users/${user_uid}/info/isVisitedPages/`).on('value', (snapshot) => {
                snapshot.forEach((el) => {
                    let pages = snapshot.val();
                    dispatch(getVisitedPagesSuccess(
                        pages.you_page,
                        pages.bill_page,
                        pages.category_page,
                        pages.history_page,
                        pages.records_page,
                        pages.survey_page,
                    ));
                })
            });
        }
        catch {
            dispatch(getVisitedPagesError());
        };
    };
};

//////////// getting visited pages state 
export const getVisitedPagesSuccess = (you_page, bill_page, category_page, history_page, records_page, survey_page) => ({
    type: GET_VISITED_PAGES_SUCCESS,
    you_page,
    bill_page,
    category_page,
    history_page,
    records_page,
    survey_page,
});

export const getVisitedPagesError = () => ({
type: GET_VISITED_PAGES_ERROR,
});

//TODO: Поменять состояние просмотреных страниц ( func )
// Каждый action обработать т.е получаем нужный state странциы и меняем с помощью action ( когда юзер нажимает на кнопку ЗАКРЫТЬ в модальном окне) 

// you page
export const setFirstVisitYouPage = (user_uid) => {
    return async (dispatch) => {
            let updateYouPage = {};
            updateYouPage['users/' + user_uid + '/info/isVisitedPages/you_page'] = true;
            await (firebase.database().ref().update(updateYouPage));
    };
};
export const setFirstVisitHistoryPage = (user_uid) => {
    return async (dispatch) => {
            let updateHistoryPage = {}
            updateHistoryPage['users/' + user_uid + '/info/isVisitedPages/history_page'] = true; 
            await firebase.database().ref().update(updateHistoryPage);
    };
};
export const setFirstVisitBillPage = (user_uid) => {
    return async (dispatch) => {
            let updateBillPage = {}
            updateBillPage['users/' + user_uid + '/info/isVisitedPages/bill_page'] = true; 
            await firebase.database().ref().update(updateBillPage);
    };
};
export const setFirstVisitCategoryPage = (user_uid) => {
    return async (dispatch) => {
            let updateCategoryPage = {}
            updateCategoryPage['users/' + user_uid + '/info/isVisitedPages/category_page'] = true; 
            await firebase.database().ref().update(updateCategoryPage);
    };
};
export const setFirstVisitRecordsPage = (user_uid) => {
    return async (dispatch) => {
            let updateRecordsPage = {}
            updateRecordsPage['users/' + user_uid + '/info/isVisitedPages/records_page'] = true; 
            await firebase.database().ref().update(updateRecordsPage);
    };
};
export const setFirstVisitSurveyPage = (user_uid) => {
    return async (dispatch) => {
            let updateSurveyPage = {}
            updateSurveyPage['users/' + user_uid + '/info/isVisitedPages/survey_page'] = true; 
            await firebase.database().ref().update(updateSurveyPage);
    };
}; 
////////////////
export const visitedPagesCreatedSuccess = () => ({
    type: CREATE_VISITED_PAGES_SUCCESS,
});

export const visitedPagesCreatedError = () => ({
    type: CREATE_VISITED_PAGES_ERROR,
});