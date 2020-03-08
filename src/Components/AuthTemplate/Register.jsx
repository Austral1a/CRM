/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/templatesStyle/auth.css'
import firebase from 'firebase/app';
import 'firebase/auth'

import { Redirect, Route, Switch } from 'react-router-dom';


import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        bool: state.currUserReducer.bool,
    }
}

const ConnectedRegister = ({ bool }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const writeUserData = async (uid) => {
        firebase.database().ref(`users/${username}/info`).set({
            bill: 100,
            username,
            email,
            password,
            uid: uid
        })
    };

    const getUid = () => {
        const user = firebase.auth().currentUser;
        return user ? user.uid : null;
    }

    return (
        <>
            <div className="row center">
                <form
                    className="col s12"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                        const uid = getUid();
                        await writeUserData(uid);
                    }}>
                    <h2>Регистрация</h2>
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
                        <div placeholder='Username' className='input-field'>
                            <input
                                id='username'
                                type="text"
                                className='validate'
                                onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <input
                            type='submit'
                            className='waves-effect waves-light btn-small'
                            value='Зарегисрироватся'
                        />
                    </div>
                </form>
            </div>
            <Switch>
                <Route path="/register">
                    {bool ? <Redirect to='/you' /> : null}
                </Route>
            </Switch>
        </>
    )
}

const Register = connect(
    mapStateToProps
)(ConnectedRegister);

export default Register