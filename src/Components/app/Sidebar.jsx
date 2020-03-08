import React, { useEffect, useState } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import '../../styles/sidebarStyle/sidebar.css'

import firebase from 'firebase/app';
import 'firebase/auth'

import Bill from '../BillTemplate/Bill';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import User from '../userTemplate/User';
const Sidebar = () => {
    useEffect(() => {
        // for sidenav animnations and all that stuff
        var sidenav = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(sidenav, {});
    });

    return (
        <>
            <ul id="slide-out" className="sidenav">
                <li><Link className='waves-effect waves-teal' to="/you">Ваш профиль</Link></li>
                <li><Link className='waves-effect waves-teal' to="/bill">Счет</Link></li>
            </ul>
            <Switch>
                <Route path="/you">
                    <User user_email='email or username' />
                </Route>
                <Route path="/bill">
                    <Bill />
                </Route>
            </Switch>
        </>
    )
}

export default Sidebar;