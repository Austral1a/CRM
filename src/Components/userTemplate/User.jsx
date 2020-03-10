import React, { useState, useEffect } from 'react';
// css
import '../../styles/UserTemplateStyle/user.css'
import '../../styles/otherStyles/loader.css'
import '../../styles/UserTemplateStyle/cardActions.css'
//
// reddux stuff to connect mapStateToProps( select ), and mapDispatchToProps if it exists
import { connect } from 'react-redux';
//
// Card Component
import Card from './CardChangeBill';
//
// action creator
import { getUserBillValue } from '../../store/actions/index';
//
const mapStateToProps = (state) => {
    return {
        user: state.currUserReducer.user,
        user_uid: state.currUserReducer.userUid,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid))
    }
});
//TODO: Добавить в getUserBillValue, bool val loading!!
const ConnectedUser = ({ user, getBill, user_uid }) => {
    useEffect(() => {
        getBill(user_uid);
    }, [getBill, user_uid]);

    return (
        <div className='user-information'>
            <h5>{user.email}</h5>
            <Card />
        </div>
    );
};

const User = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedUser);

export default User;