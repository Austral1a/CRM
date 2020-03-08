/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../Components/AuthTemplate/Login';
import Register from '../Components/AuthTemplate/Register';
import Navbar from '../Components/app/Navbar';
import Sidebar from '../Components/app/Sidebar';
import '../store/reducers/index';

import '../styles/templatesStyle/auth.css'
const BaseTemplate = () => {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                {/*<Route path="/categories" component={Categories}></Route> */}
            </Switch>
        </Router>
    )
}
export default BaseTemplate;
