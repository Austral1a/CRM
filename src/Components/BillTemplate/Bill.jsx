import React, { useState, useEffect } from 'react';
//css
import '../../styles/BillStyle/bill.css';
import '../../styles/otherStyles/loader.css';
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
// action creator
import { getUserBillValue } from '../../store/actions/index';
//

// bill amount html block
import BillAmount from './BillAmount';
//
const mapStateToProps = (state) => {
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

    const getCurrencies = async () => {
        try {
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API}&symbols=USD,PLN,EUR,RUB,UAH`);
            const data = await res.json();
            setCurrencies(data.rates);
            toastAnimation('Обновление произошло');
        } catch {
            toastAnimation('Что-то пошло не так');
        }
    }

    useEffect(() => {
        tooltipAnimation();
        if (bool) {
            getBill(user_uid);
        }
        getCurrencies();
    }, [bool]);

    return (
        <>
            <div className="wrapper">
                <BillAmount user_bill={user_bill} />
                <div className='current-currency-price'>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title white-text">Цены на валюту</span>
                            <RefreshCurrency onClick={getCurrencies} />
                            {bool ? <table className="currencies-list">
                                <tbody>
                                    {currencies ? Object.keys(currencies).map((currency) => {
                                        return (
                                            <tr key={currency}>
                                                <td key={currencies[currency]}>{currency}</td>
                                                <td key={Math.random()}>{toFixed(user_bill / (currencies['UAH'] / currencies[currency]), 3)} <small>{currency}</small></td>
                                            </tr>
                                        )
                                    }) : <div className='loader'></div>}
                                </tbody>
                            </table> : <div className='loader'></div>}
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route>
                    {/*TODO: Заменить user на булевое знач*/}
                    {/*!bool ? <Redirect from='/login' to='/bill' ></Redirect> : null*/}
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