import React, { useEffect, useCallback } from 'react';
// css
import '../../styles/UserTemplateStyle/user.css'
import '../../styles/otherStyles/loader.css'
import '../../styles/UserTemplateStyle/cardActions.css'
//
import '../../styles/otherStyles/modal.css';
import PropTypes from 'prop-types';
// reddux stuff to connect mapStateToProps( select ), and mapDispatchToProps if it exists
import { connect } from 'react-redux';
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
// Card Component
import Card from './CardChangeBill';
//
// action creator
import { getUserBillValue, getUsername} from '../../store/actions/index';
//
import { setFirstVisitYouPage, getVisitedPages } from '../../store/actions/index';
import ChangeUsername from './changeUserName';
const mapStateToProps = (state) => {
    return {
        user: state.currUserReducer.user,
        user_uid: state.currUserReducer.userUid,
        username: state.getUsernameReducer.username,
        isVisitedYouPage: state.getVisitedPagesReducer.you_page,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid))
    },
    getUsername: (user_uid) => {
        dispatch(getUsername(user_uid))
    },
    setFirstVisitYouPage: (user_uid) => {
        dispatch(setFirstVisitYouPage(user_uid));
    },
    getVisitedPages: (user_uid) => {
        dispatch(getVisitedPages(user_uid));
    }
});
const ConnectedUser = ({ 
    user, 
    getBill, 
    user_uid,
    getUsername,
    username,
    setFirstVisitYouPage,
    isVisitedYouPage,
    getVisitedPages,
     }) => {

    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);
    useEffect(() => {
        getVisitedPages(user_uid);
        getBill(user_uid);
        getUsername(user_uid);
        if (!isVisitedYouPage) {
            if(username) {
                modalOpen();
            };
        };
        return () => {
           modalDestroy();
        }
    }, [getBill, getUsername, user_uid, username, isVisitedYouPage, getVisitedPages ]);
    const handleClick = () => {
        setFirstVisitYouPage(user_uid);
    }

    return (
        <>
            <div className="wrapper-user">
                <div className='card custom-card-user-information'>
                    <div className="card-content">
                    {username ? 
                        <>
                            <h5>Email: {user.email}</h5>
                            <h5>Username: {username}</h5>
                            <ChangeUsername />
                        </>
                        : <div className="loader"></div>}
                    </div>
                </div>
                <Card />
            </div>
            {!isVisitedYouPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                Эта страница вашего профиля, здесь вы можете посмотреть ваш Email и Имя пользователя которое можно изменить.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleClick} className="modal-close waves-effect waves-green btn-flat">Больше не показывать</button>
                        </div>
                    </div>
                    ) : null}
            </>
    );
};

const User = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedUser);

ConnectedUser.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    user_uid: PropTypes.string.isRequired,
    getBill: PropTypes.func.isRequired
}

export default User;