/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
    Link,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import firebase from 'firebase';
import auth from 'firebase/auth';
import { connect } from 'react-redux';
import { currentSignedInUser } from '../../store/actions/index';
import '../../styles/navbarStyle/navbar.css'

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.currUserReducer.user,
        bool: state.currUserReducer.bool
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        currUser: () => dispatch(currentSignedInUser())
    }
};

let ConnectedNavbar = ({ currUser, user, bool }) => {

    useEffect(() => {
        currUser();
    });

    return (
        <nav className="nav-extend teal">
            <div className="nav-content">
                <ul>
                    <li className="left">
                        <a href='#'
                            data-target="slide-out"
                            className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                    </li>
                    {!bool ? (
                        <>
                            <li className="right">
                                <Link exact to='/login'>Login</Link>
                            </li>
                            <li className="right">
                                <Link exact to="/register">Register</Link>
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
                    </>)}
                </ul>
            </div>
        </nav>
    )
};

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavbar);

export default Navbar;