import React from 'react';
// css
import '../../styles/UserTemplateStyle/user.css'
import '../../styles/otherStyles/loader.css'
import '../../styles/UserTemplateStyle/cardActions.css'
//
// reddux stuff to connect mapStateToProps( select ), and mapDispatchToProps if it exists
import { connect } from 'react-redux';
//
// Card Component
import Card from '../app/Card';
//
const mapStateToProps = (state) => {
    return {
        user: state.currUserReducer.user,
    }
}

const ConnectedUser = ({ user }) => {

    return (
        <div className='user-information'>
            <h5>{user.email}</h5>
            <Card />
        </div>
    )

}

const User = connect(
    mapStateToProps
)(ConnectedUser);

export default User;