import React, { useState, useEffect, useLayoutEffect } from 'react';
//css
import '../../styles/BillStyle/bill.css';
import '../../styles/otherStyles/loader.css';
//
//firebase
import firebase from 'firebase';
//
//react-redux
import { connect } from 'react-redux';
//
// tooltip animation
import tooltipAnimation from '../../css-materialize animations/tooltip';
//

// toast animation
import toastAnimation from '../../css-materialize animations/toast';
//

// refrech currencies btn 
import RefreshCurrency from './RefreshCurrencyBtn';
//

// correct way to'toFixed' number
import toFixed from '../../filters/numberFilter';
//

// router stuff
import {
    Switch,
    Redirect,
    Route
} from 'react-router-dom'
//
//
import { getUserBillValue } from '../../store/actions/index';
//
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.currUserReducer.user,
        user_uid: state.currUserReducer.userUid,
        bool: state.currUserReducer.bool,
        user_bill: state.userBillValueReducer.user_bill
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBill: (user_uid) => {
            dispatch(getUserBillValue(user_uid))
        }
    }
}

const ConnectedBill = ({ user_uid, bool, user, user_bill, getBill }) => {

    const [currencies, setCurrencies] = useState('');
    const [toastText, setToastText] = useState('');
    const [loading, setLoading] = useState(false);

    // getting current bill amount, from db
    /* const getBill = () => {
        return firebase.database().ref(`users/${user_uid}/info/bill`).on('value', (snapshot) => {
            let bill = (snapshot.val()) || 0;
            setBill(bill);
        })
    }; */
    //
    const getCurrencies = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API}&symbols=USD,PLN,EUR,RUB,UAH`);
            const data = await res.json();
            setCurrencies(data.rates);
            !loading ? setToastText('Обновление произошло') : setToastText('');
            toastAnimation(String(toastText));
            setLoading(false);
        } catch {
            setToastText('Что-то пошло не так');
            toastAnimation(String(toastText));
            setLoading(false);
        }
    }

    useEffect(() => {
        tooltipAnimation();
        if (bool) {
            getBill(user_uid);
        }
        getCurrencies();
    }, [bool]);


    // TODO: Добавить pop-up после обновления
    return (
        <>
            <div className="wrapper">
                {console.log(currencies)}
                <div className='available-bill'>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title white-text">Счет</span>
                            <h5 className="tooltipped" data-position='bottom' data-tooltip='Это ваш текущий счет'>{user_bill} грн</h5>
                        </div>
                    </div>
                </div>
                <div className='current-currency-price'>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title white-text">Цены на валюту</span>
                            <RefreshCurrency onClick={getCurrencies} />
                            {!loading ? <table className="currencies-list">
                                <tbody>
                                    {currencies ? Object.keys(currencies).map((currency) => {
                                        return (
                                            <tr key={currency}>
                                                <td key={currencies[currency]}>{currency}</td>
                                                <td key={Math.random()}>{toFixed(user_bill / (currencies['UAH'] / currencies[currency]), 3)} <small>{currency}</small></td>
                                            </tr>
                                        )
                                    }) : <tr><td>Загрузка...</td></tr>}
                                </tbody>
                            </table> : <div className='loader'></div>}
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route>
                    {!user ? <Redirect to='/login'></Redirect> : null}
                </Route>
            </Switch>
        </>
    )
}

const Bill = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedBill);

export default Bill;