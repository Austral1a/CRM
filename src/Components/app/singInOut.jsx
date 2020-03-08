import React from 'react';
import firebase from 'firebase';
import auth from 'firebase/auth';
import { connect } from 'react-redux';
const mapStateToProps = (state) => ({
    bool: state.currUserReducer.bool,
    user: state.currUserReducer.user,
});

const ConnectedLogInOut = ({ bool, user }) => {
    return (
        <>
            {!bool ? (
                <>
                    <li className="right">
                        asdasd
                    </li>
                    <li className="right">
                        asdsad
                    </li>
                </>
            ) : (<>
                <li className='right'><button
                    className='waves-effect waves-teal btn-small'
                    onClick={() => {
                        if (firebase.auth().currentUser) {
                            firebase.auth().signOut();
                        } else {
                            console.log('Error occurs');
                        }
                    }}>
                    Выйти
            </button></li>
                <li className='right '>{user.email}</li>
            </>)
            }
        </>
    )
}

const LogInOut = connect(
    mapStateToProps
)(ConnectedLogInOut);

export default LogInOut;