/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../../styles/templatesStyle/auth.css'
import firebase from 'firebase/app';
import 'firebase/auth'
import PropTypes from 'prop-types';
import '../../styles/templatesStyle/auth.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import {toastAnimation, toastAnimationDestroy} from '../../css-materialize animations/toast'; 
import {createVisitedPages} from '../../store/actions/index';

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        isUserAnonymous: state.currUserReducer.isUserAnonymous,
    };
};

const mapDispatchToProps = (dispatch) => ({
    createVisitedPages: (user_uid) => {
        dispatch(createVisitedPages(user_uid));
    }
});

const ConnectedRegister = ({ 
    isUserAnonymous,
    createVisitedPages,
     }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const writeUserData = async (uid) => {
        firebase.database().ref(`users/${uid}/info`).set({
            bill: 100,
            username,
            email,
            password,
            uid: uid
        })
    };

    const emailValidate = (email) => {
        return /[a-zA-Z]+@[a-zA-Z]+\.[a-z]{0,5}/.test(email)
    }

    const getUid = () => {
        const user = firebase.auth().currentUser;
        return user ? user.uid : null;
    };
    const onSubmit = async () => {
        if( email.trim() == '') {
            toastAnimation('Введите Email');
        } else if (!emailValidate(email.trim())) {
            toastAnimation('Нужен корректный Email: email@mail.com');
        }
        else if (password.trim() == '' || password.length < 6) {
            toastAnimation('Введите пароль, должно быть как минимум 6 символов');
        } else if ( username.trim() == '') {
            toastAnimation('Имя пользователя должно содержать хотя-бы 1 символ');
        } else {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = getUid();
                writeUserData(uid);
                toastAnimation('Регистрация прошла успешно');
                await createVisitedPages(uid);
            } catch {
                toastAnimation('Такой email уже существует');
            }
        };
    };

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        }
    }, []);


    return (
        <>
            <div className="wrapper-login-register">
            <div className="card custom-card-login-register">
                <div className="card-content">
                <form
                    className="col s12"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}>
                    <h5>Регистрация</h5>
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
                                onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <button
                            type='submit'
                            className='waves-effect waves-light btn btn-small'
                        >зарегистрироваться</button>
                    </div>
                </form>
            </div>
                </div>
            </div>
            <Switch>
                <Route path="/register">
                    {!isUserAnonymous ? <Redirect to='/you' /> : null}
                </Route>
            </Switch>
        </>
    )
}

const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedRegister);

ConnectedRegister.propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    createVisitedPages: PropTypes.func.isRequired,
}

export default Register