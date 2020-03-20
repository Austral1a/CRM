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


import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        isUserAnonymous: state.currUserReducer.isUserAnonymous,
    };
};

const ConnectedBaseTemplate = ({isUserLoggedIn, isUserAnonymous}) => {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                {!isUserAnonymous ? <Route exact path='/' component={User}></Route> : <Redirect from={/[a-zA-Z]/} to='/login' component={Login}></Redirect>}
            </Switch>
        </Router>
    );
};

const BaseTemplate = connect(
    mapStateToProps
)(ConnectedBaseTemplate);

export default BaseTemplate;
