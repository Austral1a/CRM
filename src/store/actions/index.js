import {
    SIGNIN_ERROR,
    SIGNIN_SUCCESS,
    CURRENT_USER_NOT_ANONYMOUS,
    CURRENT_USER_ANONYMOUS
} from './constants/action-types';
import firebase from 'firebase';
import auth from 'firebase/auth';
// action creator as well, just with async doings, 
//  that means action-creator returns a func rather than action
export const signInUser = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                dispatch(signInUserSuccess())
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
    return (dispatch, getState) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
                dispatch(currentUserNotAnonymous(user));
            } else {
                dispatch(currentUserIsAnonymous());
            }
        });
    };
};

export const currentUserNotAnonymous = (user) => ({
    type: CURRENT_USER_NOT_ANONYMOUS,
    user,
});

export const currentUserIsAnonymous = () => ({
    type: CURRENT_USER_ANONYMOUS,
});