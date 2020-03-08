import React, { useState, useEffect } from 'react';
import '../../styles/templatesStyle/auth.css'
import firebase from 'firebase/app';
import 'firebase/auth';
import {
    Link,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { signInUser } from '../../store/actions/index';
import { currentSignedInUser } from '../../store/actions/index';
import '../../styles/otherStyles/loader.css';

const mapStateToProps = (state) => {
    return {
        error: state.signInReducer.error,
        bool: state.currUserReducer.bool
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

// TODO: При успешном логине перезагружать страницу
const ConnectedLogin = ({ signUserIn, currUser, error, bool }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                signUserIn(email, password);
                currUser();
            }}>
                <h2>Вход в систему</h2>
                <div className="wrap">
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
                    <input
                        type='submit'
                        className='waves-effect waves-light btn-small'
                        value='Войти' />
                    {error ? <p className="red">{error}</p> : null}
                </div>
            </form>
            <Switch>
                <Route path="/login">
                    {bool ? <Redirect to='/you' /> : null}
                </Route>
            </Switch>
        </>
    )
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedLogin);
export default Login