import React, { useEffect } from 'react';
// css
import '../../styles/UserTemplateStyle/user.css'
import '../../styles/otherStyles/loader.css'
import '../../styles/UserTemplateStyle/cardActions.css'
//
import PropTypes from 'prop-types';
// reddux stuff to connect mapStateToProps( select ), and mapDispatchToProps if it exists
import { connect } from 'react-redux';
//
// Card Component
import Card from './CardChangeBill';
//
// action creator
import { getUserBillValue, getUsername} from '../../store/actions/index';
//
import ChangeUsername from './changeUserName';
const mapStateToProps = (state) => {
    return {
        user: state.currUserReducer.user,
        user_uid: state.currUserReducer.userUid,
        username: state.getUsernameReducer.username,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid))
    },
    getUsername: (user_uid) => {
        dispatch(getUsername(user_uid))
    }
});
const ConnectedUser = ({ 
    user, 
    getBill, 
    user_uid,
    getUsername,
    username }) => {
    useEffect(() => {
        getBill(user_uid);
        getUsername(user_uid)
    }, [getBill, getUsername,user_uid]);

    return (
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