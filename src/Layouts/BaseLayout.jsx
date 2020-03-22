/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from '../Components/AuthTemplate/Login';
import Register from '../Components/AuthTemplate/Register';
import Navbar from '../Components/app/Navbar';
import Sidebar from '../Components/app/Sidebar';
import User from '../Components/userTemplate/User';
import '../store/reducers/index';
import '../styles/otherStyles/loader.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        isUserAnonymous: state.currUserReducer.isUserAnonymous,
        isUserLoggedIn: state.currUserReducer.isUserLoggedIn,
    };
};

const ConnectedBaseTemplate = ({ isUserLoggedIn, isUserAnonymous}) => {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                {isUserLoggedIn ? <Route exact path='/' component={User}></Route> : null}
                {isUserAnonymous ? <Redirect from='/' to='/login'></Redirect> : null}
            </Switch>
        </Router>)
};

const BaseTemplate = connect(
    mapStateToProps
)(ConnectedBaseTemplate);

ConnectedBaseTemplate.propTypes = {
    isUserAnonymous: PropTypes.bool.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired
}

export default BaseTemplate;
