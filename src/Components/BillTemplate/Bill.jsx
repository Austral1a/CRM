import React, { useState, useEffect } from 'react';
//css
import '../../styles/BillStyle/bill.css';
//
//firebase
import firebase from 'firebase';
//
//react-redux
import { connect } from 'react-redux';
//
// toast animation
import toastAnimation from '../../css-materialize animations/toast';
//

// refrech currencies btn 
import RefreshCurrency from './RefreshCurrencyBtn';
//

const mapStateToProps = (state) => {
    return {
        user_uid: state.currUserReducer.userUid,
        bool: state.currUserReducer.bool,
    }
}

const ConnectedBill = ({ user_uid, bool }) => {

    const [bill, setBill] = useState(0);
    const [currencies, setCurrencies] = useState('');

    // getting current bill amount, from db
    const getBill = () => {
        return firebase.database().ref(`users/${user_uid}/info/bill`).on('value', (snapshot) => {
            let bill = (snapshot.val()) || 0;
            setBill(bill);
        })
    };
    //
    const getCurrencies = async () => {
        const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_API}&symbols=USD,PLN,EUR,RUB,UAH`);
        const data = await res.json();
        setCurrencies(data.rates);
    }

    useEffect(() => {
        toastAnimation();
        if (bool) {
            getBill();
        }
        getCurrencies();
    }, [bool]);

    // TODO: Добавить pop-up после обновления
    return (
        <div className="wrapper">
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
                            <tbody>
                                {currencies ? Object.keys(currencies).map((currency) => {
                                    return (
                                        <tr key={currency}>
                                            <td key={currencies[currency]}>{currency}</td>
                                            <td key={Math.random()}>{(bill / (currencies['UAH'] / currencies[currency]))} <small>{currency}</small></td>
                                        </tr>
                                    )
                                }) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Bill = connect(
    mapStateToProps
)(ConnectedBill);

export default Bill;