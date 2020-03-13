import React, { useState, useEffect } from 'react';
import '../../styles/otherStyles/loader.css';
import '../../styles/RecordStyle/record.css';

import { getCategories, getUserBillValue } from '../../store/actions/index';

import { connect } from 'react-redux';

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
});

const ConnectedRecord = ({
    user_uid,
    categories,
    get_categ_success,
    getCategories,
    getBill
}) => {
    const [selectValue, setSelectValue] = useState('');
    const [checkboxIncome, setCheckboxIncome] = useState(false);
    const [checkboxConsumption, setCheckboxConsumption] = useState(true);

    useEffect(() => {
        getCategories(user_uid);
        getBill(user_uid);
    }, [user_uid, getBill, getCategories]);

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
                                {Object.values(categories).map((categ) => {
                                    return <option key={categ.name} value={categ.name}>{categ.name}</option>
                                })}
                            </select>
                            <div className="input-field">
                                <label placehorder='Сумма' htmlFor="sum">Сумма</label>
                                <input type="number" id='sum' />
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
                                <input placehorder='Описание' type="text" id='description' />
                            </div>
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

export default Record;