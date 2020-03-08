import React from 'react';
import '../../styles/UserTemplateStyle/user.css'
import '../../styles/otherStyles/loader.css'
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.currUserReducer.user
    }
}

const ConnectedUser = ({ user }) => {

    return (
        <div className='user-information'>
            <h5>{user.email}</h5>
            <div className="loader"></div>
        </div>
    )

}

const User = connect(
    mapStateToProps
)(ConnectedUser);

export default User;