import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/RecordStyle/record.css';
import prefillingTextInputs from '../../css-materialize animations/prefillingTextInput';

import { getCategories, getUserBillValue } from '../../store/actions/index';

import { connect } from 'react-redux';

import firebase from 'firebase';
import {modalAnimation, modalDestroy, modalOpen} from '../../css-materialize animations/modal';
import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';
import { setFirstVisitRecordsPage, getVisitedPages } from '../../store/actions/index';
import PropTypes from 'prop-types';

import { updateDb } from '../../store/actions/index';
import dateFilter from '../../filters/dateFilter';
const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
    isVisitedRecordsPage: state.getVisitedPagesReducer.records_page,
});
const mapDispatchToProps = (dispatch) => ({
    getCategories: (user_uid) => {
        dispatch(getCategories(user_uid))
    },
    getBill: (user_uid) => {
        dispatch(getUserBillValue(user_uid));
    },
    updateDbWriteRecord: (user_uid) => {
        dispatch(updateDb(user_uid));
    },
    setFirstVisitRecordsPage: (user_uid) => {
        dispatch(setFirstVisitRecordsPage(user_uid));
    },
    getVisitedPages: (user_uid) => {
        dispatch(getVisitedPages(user_uid));
    }
});

const ConnectedRecord = ({
    user_uid,
    categories,
    get_categ_success,
    getCategories,
    getBill,
    updateDbWriteRecord,
    isVisitedRecordsPage,
    getVisitedPages,
    setFirstVisitRecordsPage
}) => {
    const [selectValue, setSelectValue] = useState('');
    const [checkboxIncome, setCheckboxIncome] = useState(false);
    const [checkboxConsumption, setCheckboxConsumption] = useState(true);
    const [descript, setDescript] = useState('');
    const [amount, setAmount] = useState(0);

    const [selectCategKey, setSelectCategKey] = useState('');

    const modelRef = useCallback(
        (node) => {
            if (node != null) {
                modalAnimation(node);
            };
    }, []);

    const handleCurrCategory = useCallback(
        () => {
            Object.keys(categories).map((key) => {
                if (categories[key].name === selectValue) {
                    setSelectCategKey(key);
                }
            });
        }, [categories, selectValue]);

    const writeRecordDb = () => {
        handleCurrCategory();
        let postDataIncome = {
            income: +amount,
            descrtiption: descript,
            category: categories[selectCategKey].name,
            time: dateFilter(new Date(), ['historyDate', 'time']),
        };
        let postDataConsumption = {
            consumption: +amount,
            descrtiption: descript,
            category: categories[selectCategKey].name,
            time: dateFilter(new Date(), ['historyDate', 'time']),
        };
        let postKey = firebase.database().ref().child(selectCategKey).push().key;
        let updates = {};
        let updatesRecordAmout = {};
        try {
            updates['users/' + user_uid + '/categories/records/' + postKey] = checkboxIncome ? postDataIncome : postDataConsumption;
            updateDbWriteRecord(updates);

            updatesRecordAmout['users/' + user_uid + '/categories/' + selectCategKey + '/total'] = checkboxIncome ?
                (categories[selectCategKey].total ? categories[selectCategKey].total + +amount : categories[selectCategKey].limit + +amount)
                :
                (categories[selectCategKey].total ? categories[selectCategKey].total - +amount : categories[selectCategKey].limit - +amount);
            updateDbWriteRecord(updatesRecordAmout);
            toastAnimation('Запись была успешно добавлена');
        } catch {
            toastAnimation('Что-то пошло не так');
        }
    };

    useEffect(() => {
        getCategories(user_uid);
        getBill(user_uid);
        getVisitedPages(user_uid);
        if(amount !== '') {
            prefillingTextInputs();
        };
        if (!isVisitedRecordsPage) {
            if(get_categ_success) {
                modalOpen();
            };
        };
        return () => {
            modalDestroy();
        }
    }, [user_uid, getCategories, getBill, amount, getVisitedPages, get_categ_success,isVisitedRecordsPage]);

    useEffect(() => {
        handleCurrCategory();
    }, [handleCurrCategory]);

    useEffect(() => {
        return () => {
            toastAnimationDestroy();
        };
    }, []);

    const handleClick = () => {
        setFirstVisitRecordsPage(user_uid);
    }
    return (
        <>
        <div className='wrapper-record'>
            <div className="card custom-card-record">
                <div className='card-content'>
                    {get_categ_success ?
                        <>
                            <h4>Записи</h4>
                            <select
                                value={selectValue}
                                className='browser-default'
                                onChange={(e) => setSelectValue(e.target.value)}>
                                <option defaultValue value="">Выберите категорию</option>
                                {Object.values(categories).map((categ) => {
                                    return <option key={categ.name} value={categ.name}>{categ.name}</option>
                                })}
                            </select>
                            <div className="input-field">
                                <label placehorder='Сумма' htmlFor="sum">Сумма</label>
                                <input
                                    type="number"
                                    id='sum'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <p>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        checked={checkboxIncome}
                                        onChange={(e) => {
                                            setCheckboxIncome(e.target.checked)
                                            e.target.checked ? setCheckboxConsumption(false) : setCheckboxConsumption(true)
                                        }} />
                                    <span>Доход</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        checked={checkboxConsumption}
                                        onChange={(e) => {
                                            setCheckboxConsumption(e.target.checked)
                                            e.target.checked ? setCheckboxIncome(false) : setCheckboxIncome(true)
                                        }} />
                                    <span>Расход</span>
                                </label>
                            </p>
                            <div className="input-field">
                                <label htmlFor="description">Описание</label>
                                <input
                                    placehorder='Описание'
                                    type="text"
                                    id='description'
                                    value={descript}
                                    onChange={(e) => setDescript(e.target.value)} />
                            </div>
                            <button
                                className='waves-effect waves-light btn btn-small'
                                onClick={writeRecordDb}
                            >Обновить</button>
                        </> : <div className='loader'></div>}
                </div>
            </div>
        </div>
        {!isVisitedRecordsPage ?
                (
                    <div ref={modelRef} id='modal' className='modal'>
                        <div className='modal-content'>
                            <h4>Для чего это страница?</h4>
                            <p>
                                Эта страница в которой вы можете добавлять расходы или доходы в нужную вам категорию, и также указывать описание.
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

const Record = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedRecord);

ConnectedRecord.propTypes = {
    user_uid: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    get_categ_success: PropTypes.bool.isRequired,
    getCategories: PropTypes.func.isRequired,
    getBill: PropTypes.func.isRequired,
    updateDbWriteRecord: PropTypes.func.isRequired,
    isVisitedRecordsPage: PropTypes.bool.isRequired,
    getVisitedPages: PropTypes.func.isRequired,
    setFirstVisitRecordsPage: PropTypes.func.isRequired,
};

export default Record;