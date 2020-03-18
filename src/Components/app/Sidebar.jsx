import React, { useEffect, useCallback } from 'react';
import '../../styles/sidebarStyle/sidebar.css'

import 'firebase/auth'

import {sidenavAnimation, sidenavDestroy, sidenavClose} from '../../css-materialize animations/sidenav';

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
    const sidenavRef = useCallback(
        (node) => {
            if (node != null) {
                sidenavAnimation(node);
            };
        }, []);

    useEffect(()  => {
        return () => {
            sidenavDestroy();
        }
    })
    return (
        <>
            <ul id="slide-out" ref={sidenavRef} className="sidenav">
                <li><Link onClick={sidenavClose} className='waves-effect waves-teal' to="/you">Ваш профиль</Link></li>
                <li><Link onClick={sidenavClose} className='waves-effect waves-teal' to="/history">История</Link></li>
                <li><Link onClick={sidenavClose} className='waves-effect waves-teal' to="/bill">Счет</Link></li>
                <li><Link onClick={sidenavClose} className='waves-effect waves-teal' to="/category">Категории</Link></li>
                <li><Link onClick={sidenavClose} className='waves-effect waves-teal' to="/records">Записи</Link></li>
                <li><Link onClick={sidenavClose} className='waves=effect waves-teal' to="/survey">Обзор</Link></li>
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