import React, {useEffect, useCallback } from 'react';
//css
import '../../styles/BillStyle/bill.css';
import '../../styles/otherStyles/loader.css';
//
//react-redux
import { connect } from 'react-redux';
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
import symbols from  '../../filters/currenciesSignsFilter.json';

// bill amount html block
import BillAmount from './BillAmount';
//
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
import { setFirstVisitBillPage, getVisitedPages } from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        user_uid: state.currUserReducer.userUid,
        user_bill: state.userBillValueReducer.user_bill,
        //fetch 
        currencies: state.fetchToFixerApiReducer.currencies,
        isFetchFixerSuccess: state.fetchToFixerApiReducer.isSuccess,
        fetchFixerError: state.fetchToFixerApiReducer.error,

        isVisitedBillPage: state.getVisitedPagesReducer.bill_page,
        getVisitedPagesSuccess: state.getVisitedPagesReducer.getVisitedPagesSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBill: (user_uid) => {
            dispatch(getUserBillValue(user_uid));
        },
        getCurrencies: () => {
            dispatch(fetchFixer());
        },
        setFirstVisitBillPage: (user_uid) => {
            dispatch(setFirstVisitBillPage(user_uid));
        },
        getVisitedPages: (user_uid) => {
            dispatch(getVisitedPages(user_uid));
        }
    };
};

const ConnectedBill = ({
    user_uid,
    user_bill,
    getBill,
    currencies,
    isFetchFixerSuccess,
    getCurrencies,
    isVisitedBillPage,
    setFirstVisitBillPage,
    getVisitedPages,
    getVisitedPagesSuccess
}) => {

    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);

    useEffect(() => {
        document.title = 'Bill | Wallet'
        getCurrencies();
        getBill(user_uid);
        getVisitedPages(user_uid);
        if (!isVisitedBillPage) {
            if(getVisitedPagesSuccess) {
                modalOpen();
            }
        };
        return () => {
            toastAnimationDestroy();
            modalDestroy();
        }
    }, [getBill, user_uid, getCurrencies, getVisitedPagesSuccess, getVisitedPages, isVisitedBillPage]);

    const handleClick = () => {
        setFirstVisitBillPage(user_uid);
    }

    return (
        <>
        <div className="wrapper">
            <BillAmount user_bill={user_bill} />
            <div className='current-currency-price'>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title white-text">Цены на валюту</span>
                        <RefreshCurrency onClick={() => {
                            isFetchFixerSuccess ? toastAnimation('Цены были успешно обновлены') : toastAnimation('Невозможно получить данные');
                            getCurrencies();
                        }} />
                        {isFetchFixerSuccess ? 
                        <table className="currencies-list">
                            <tbody>
                                {Object.keys(currencies).map((currency) => {
                                    return (
                                        <tr key={currency}>
                                            <td key={currencies[currency]}>{currency}</td>
                                            <td key={Math.random()}>{toFixed(user_bill / (currencies['UAH'] / currencies[currency]), 3)} {symbols[currency]}</td>
                                            <td key={Math.random()}>{toFixed((currencies['UAH'] / currencies[currency]), 3)} {symbols[currency]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <div className='loader'></div>}
                    </div>
                </div>
            </div>
        </div>
        {!isVisitedBillPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                На этой странице есть ваш счет, и также отображаются текущая цена на различные валюты, и ваш счет в этих валютах.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleClick} className="modal-close waves-effect waves-green btn-flat">Больше не показывать</button>
                        </div>
                    </div>
                    ) : null}
        </>
    );
};

const Bill = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedBill);

ConnectedBill.propTypes = {
    user_uid: PropTypes.string.isRequired,
    user_bill: PropTypes.number.isRequired,
    currencies: PropTypes.object.isRequired,
    isFetchFixerSuccess: PropTypes.bool.isRequired,
    isVisitedBillPage: PropTypes.bool.isRequired,
    setFirstVisitBillPage: PropTypes.func.isRequired,
    getVisitedPages: PropTypes.func.isRequired,
    getBill: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    getVisitedPagesSuccess: PropTypes.bool.isRequired,
};

export default Bill;