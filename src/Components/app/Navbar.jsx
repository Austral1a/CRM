/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Profiler, useLayoutEffect } from 'react';
// css
import '../../styles/navbarStyle/navbar.css'
import '../../styles/otherStyles/loader.css'
//
import PropTypes from 'prop-types';
import {
    Link,
} from "react-router-dom";
// firebase
import firebase from 'firebase';
//
import { connect } from 'react-redux';
// action creator for getting current signed user
import { currentSignedInUser } from '../../store/actions/index';
//
import dateFilter from '../../filters/dateFilter';

const mapStateToProps = (state) => {
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
    const [currDateTime, setCurrDateTime] = useState('');
    useEffect(() => {
        currUser();
    });

    useLayoutEffect(() => {
        let interval = setInterval(() => {
            setCurrDateTime(dateFilter(new Date()));
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <nav className="nav-extend teal">
            {bool ? <div className="nav-content">
                <ul>
                    <li className="left">
                        <a href='#'
                            data-target="slide-out"
                            className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                    </li>
                    <Profiler id='current-date' onRender={(id,
                        phase,
                        actualDuration,
                        baseDuration,
                        startTime,
                        commitTime,
                        interactions) => (
                            id,
                            phase,
                            actualDuration,
                            baseDuration,
                            startTime,
                            commitTime,
                            interactions)}>
                        {String(currDateTime)}
                    </Profiler>
                    {!bool ? (
                        <>
                            <li className="right">
                                <Link exact='true' to='/login'>Login</Link>
                            </li>
                            <li className="right">
                                <Link exact='true' to="/register">Register</Link>
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
            </div> : <div className='loader' />}
        </nav>
    )
};

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavbar);

ConnectedNavbar.propTypes = {
    currUser: PropTypes.func.isRequired,
    // user: PropTypes.object.isRequired, ????
    bool: PropTypes.bool.isRequired,
}

export default Navbar;