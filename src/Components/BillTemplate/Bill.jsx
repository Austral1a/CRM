import React, { useState, useEffect, useCallback } from 'react';
//css
import '../../styles/BillStyle/bill.css';
import '../../styles/otherStyles/loader.css';
//
//react-redux
import { connect } from 'react-redux';
//
// tooltip animation
import { tooltipAnimation, tooltipDestroy } from '../../css-materialize animations/tooltip';
//

// toast animation
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
//

// refrech currencies btn 
import RefreshCurrency from './RefreshCurrencyBtn';
//

// correct way to'toFixed' number
import toFixed from '../../filters/numberFilter';
//
import PropTypes from 'prop-types';
// action creator
import { getUserBillValue } from '../../store/actions/index';
import { fetchFixer } from '../../store/actions/index';
//

// bill amount html block
import BillAmount from './BillAmount';
//
const mapStateToProps = (state) => {
    return {
        user_uid: state.currUserReducer.userUid,
        bool: state.currUserReducer.bool,
        user_bill: state.userBillValueReducer.user_bill,
        //fetch 
        currencies: state.fetchToFixerApiReducer.currencies,
        isFetchFixerSuccess: state.fetchToFixerApiReducer.isSuccess,
        fetchFixerError: state.fetchToFixerApiReducer.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBill: (user_uid) => {
            dispatch(getUserBillValue(user_uid));
        },
        getCurrencies: () => {
            dispatch(fetchFixer());
        }
    };
};

const ConnectedBill = ({
    user_uid,
    bool,
    user_bill,
    getBill,
    currencies,
    isFetchFixerSuccess,
    getCurrencies,
    fetchFixerError
}) => {

    useEffect(() => {
        if (bool) {
            getBill(user_uid);
        };

        getCurrencies();
    }, [bool, getBill, user_uid, getCurrencies, isFetchFixerSuccess, fetchFixerError]);


    return (
        <div className="wrapper">
            <BillAmount user_bill={user_bill} />
            <div className='current-currency-price'>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title white-text">Цены на валюту</span>
                        <RefreshCurrency onClick={() => {
                            !fetchFixerError ? toastAnimation('Цены были успешно обновлены') : toastAnimation('Невозможно получить данные');
                            getCurrencies();
                        }} />
                        {isFetchFixerSuccess ? <table className="currencies-list">
                            <tbody>
                                {Object.keys(currencies).map((currency) => {
                                    return (
                                        <tr key={currency}>
                                            <td key={currencies[currency]}>{currency}</td>
                                            <td key={Math.random()}>{toFixed(user_bill / (currencies['UAH'] / currencies[currency]), 3)} <small>{currency}</small></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <div className='loader'></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Bill = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedBill);

ConnectedBill.propTypes = {
    user_uid: PropTypes.string.isRequired,
    bool: PropTypes.bool.isRequired,
    user_bill: PropTypes.number.isRequired,
    currencies: PropTypes.object.isRequired,
    isFetchFixerSuccess: PropTypes.bool.isRequired,
    fetchFixerError: PropTypes.string.isRequired,
};

export default Bill;