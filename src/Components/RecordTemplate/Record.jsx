import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/RecordStyle/record.css';

import { getCategories, getUserBillValue } from '../../store/actions/index';

import { connect } from 'react-redux';

import firebase from 'firebase';

import { toastAnimation, toastAnimationDestroy } from '../../css-materialize animations/toast';

import PropTypes from 'prop-types';

import { updateDb } from '../../store/actions/index';
const mapStateToProps = (state) => ({
    user_uid: state.currUserReducer.userUid,
    categories: state.getCategoriesReducer.categories,
    get_categ_success: state.getCategoriesReducer.getCategoriesSuccess,
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
    }
});

const ConnectedRecord = ({
    user_uid,
    categories,
    get_categ_success,
    getCategories,
    getBill,
    updateDbWriteRecord
}) => {
    const [selectValue, setSelectValue] = useState('');
    const [checkboxIncome, setCheckboxIncome] = useState(false);
    const [checkboxConsumption, setCheckboxConsumption] = useState(true);
    const [descript, setDescript] = useState('');
    const [amount, setAmount] = useState(0);

    const [selectCategKey, setSelectCategKey] = useState('');

    const handleCurrCategory = useCallback(
        () => {
            Object.keys(categories).map((key) => {
                if (categories[key].name === selectValue) {
                    setSelectCategKey(key);
                }
                return null;
            })
        }, [categories, selectValue]);

    const writeRecordDb = () => {
        handleCurrCategory();
        let postDataIncome = {
            income: +amount,
            descrtiption: descript,
        };
        let postDataConsumption = {
            consumption: +amount,
            descrtiption: descript,
        };
        let postKey = firebase.database().ref().child(selectCategKey).push().key;
        let updates = {};
        try {
            updates['users/' + user_uid + '/categories/' + selectCategKey + '/records/' + postKey] = checkboxIncome ? postDataIncome : postDataConsumption;
            updateDbWriteRecord(updates);
            toastAnimation('Запись была успешно добавлена');
        } catch {
            toastAnimation('Что-то пошло не так');
        }
    };

    useEffect(() => {
        getCategories(user_uid);
        getBill(user_uid);
    }, [user_uid, getCategories, getBill]);
    useEffect(() => {
        handleCurrCategory();
    }, [handleCurrCategory])
    useEffect(() => {
        return () => {
            toastAnimationDestroy()
        }
    }, [])
    return (
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
};

export default Record;