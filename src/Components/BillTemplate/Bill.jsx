import React, { useState, useEffect } from 'react';
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

//
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'
//
const mapStateToProps = (state) => {
    return {
        user: state.currUserReducer.user,
        user_uid: state.currUserReducer.userUid,
        bool: state.currUserReducer.bool,
    }
}

const ConnectedBill = ({ user_uid, bool, user }) => {

    const [bill, setBill] = useState(0);
    const [currencies, setCurrencies] = useState('');
    const [toastText, setToastText] = useState('');
    const [loading, setLoading] = useState(false);

    // getting current bill amount, from db
    const getBill = () => {
        return firebase.database().ref(`users/${user_uid}/info/bill`).on('value', (snapshot) => {
            let bill = (snapshot.val()) || 0;
            setBill(bill);
        })
    };
    //
    const getCurrencies = async () => {
        try {
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API}&symbols=USD,PLN,EUR,RUB,UAH`);
            const data = await res.json();
            setCurrencies(data.rates);
            currencies ? setLoading(true) : setLoading(false);
            loading ? setToastText('Обновление произошло') : setToastText('');
            toastAnimation(toastText);
        } catch {
            setToastText('Что-то пошло не так');
            toastAnimation(toastText);
            setLoading(false);
        }
    }

    useEffect(() => {
        tooltipAnimation();
        if (bool) {
            getBill();
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
                            <h5 className="tooltipped" data-position='bottom' data-tooltip='Это ваш текущий счет'>{bill} грн</h5>
                        </div>
                    </div>
                </div>
                <div className='current-currency-price'>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title white-text">Цены на валюту</span>
                            <RefreshCurrency onClick={getCurrencies} />
                            <table className="currencies-list">
                                {!loading ? <tbody>
                                    {currencies ? Object.keys(currencies).map((currency) => {
                                        return (
                                            <tr key={currency}>
                                                <td key={currencies[currency]}>{currency}</td>
                                                <td key={Math.random()}>{toFixed(bill / (currencies['UAH'] / currencies[currency]), 3)} <small>{currency}</small></td>
                                            </tr>
                                        )
                                    }) : <p>Загрузка...</p>}
                                </tbody> : <div className='loader'></div>}
                            </table>
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
    mapStateToProps
)(ConnectedBill);

export default Bill;