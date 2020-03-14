import React, { useEffect } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import '../../styles/sidebarStyle/sidebar.css'

import 'firebase/auth'

import Bill from '../BillTemplate/Bill';
import Record from '../RecordTemplate/Record';
import {
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import User from '../userTemplate/User';
import Category from '../categoryTemplate/Category';
import Survey from '../SurveyTamplate/Survey';
import History from '../HistoryTemplate/History';
const Sidebar = () => {
    useEffect(() => {
        // for sidenav animnations and all that stuff
        var sidenav = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(sidenav, {});
    }, []);

    return (
        <>
            <ul id="slide-out" className="sidenav">
                <li><Link className='waves-effect waves-teal' to="/you">Ваш профиль</Link></li>
                <li><Link className='waves-effect waves-teal' to="/history">История</Link></li>
                <li><Link className='waves-effect waves-teal' to="/bill">Счет</Link></li>
                <li><Link className='waves-effect waves-teal' to="/category">Категории</Link></li>
                <li><Link className='waves-effect waves-teal' to="/records">Записи</Link></li>
                <li><Link className='waves=effect waves-teal' to="/survey">Обзор</Link></li>
            </ul>
            <Switch>
                <Route path="/you">
                    <User user_email='email or username' />
                </Route>
                <Route path='/history'>
                    <History />
                </Route>
                <Route path="/bill">
                    <Bill />
                </Route>
                <Route path="/category">
                    <Category />
                </Route>
                <Route path="/records">
                    <Record />
                </Route>
                <Route path="/survey">
                    <Survey />
                </Route>
            </Switch>
        </>
    )
}

export default Sidebar;