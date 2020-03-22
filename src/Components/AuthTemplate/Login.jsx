import React, { useState } from 'react';
import '../../styles/templatesStyle/auth.css'
import 'firebase/auth';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { signInUser } from '../../store/actions/index';
import { currentSignedInUser } from '../../store/actions/index';
import '../../styles/otherStyles/loader.css';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return {
        error: state.signInReducer.error,
        isUserLoggedIn: state.currUserReducer.isUserLoggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUserIn: (email, pass) => {
            dispatch(signInUser(email, pass))
        },
        currUser: () => dispatch(currentSignedInUser())
    }
}

const ConnectedLogin = ({ signUserIn, currUser, error, isUserLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
                <div className="wrapper-login-register">
                <div className="card custom-card-login-register">
                    <form onSubmit={(e) => {
                    e.preventDefault();
                    signUserIn(email, password);
                    currUser();
                        }}>
                        <div className='card-content'>
                        <h5>Вход в систему</h5>
                        <div className='input-field'>
                            <input
                                id='email'
                                type="email"
                                className='validate'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                            <div placeholder='Password' className='input-field'>
                                <input
                                    id='password'
                                    type="password"
                                    className='validate'
                                    onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="password">Password</label>
                            </div>
                        <button
                            type='submit'
                            className='waves-effect waves-light btn btn-small'
                            value='Войти'>Войти</button>
                        {error ? <p className="red">{error}</p> : null}
                        </div>
                    </form>
                    </div>
                </div>
            <Switch>
                <Route path="/login">
                    {isUserLoggedIn ? <Redirect to='/you' /> : null}
                </Route>
            </Switch>
        </>
    )
}

ConnectedLogin.propTypes = {
    error: PropTypes.string.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,
    signUserIn: PropTypes.func.isRequired,
    currUser: PropTypes.func.isRequired
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedLogin);
export default Login